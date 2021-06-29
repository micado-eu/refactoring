import {bind, BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Converter } from 'showdown'
import { GlossaryTranslationRepository } from '../repositories/glossary-translation.repository';
import { JSDOM } from "jsdom"

@bind({scope: BindingScope.SINGLETON})
export class MarkdownConverterService {
    private markdownConverter: Converter;
    // As node has no DOM to parse HTML we need an external library
    private htmlParser: HTMLDocument;
    // TODO: Change repository to prod one
    constructor(
        @repository(GlossaryTranslationRepository) public glossaryTranslationRepository: GlossaryTranslationRepository,
    ) {
        this.markdownConverter = new Converter()
        this.htmlParser = new JSDOM().window.document;
    }

    public async HTMLToMarkdown(html: string) {
        return this.markdownConverter.makeMarkdown(html, this.htmlParser)
    }

    public async markdownToHTML(markdown: string, lang: string) {
        let html = this.markdownConverter.makeHtml(markdown)
        return this.markGlossaryReferences(html, lang)
    }

    private async markGlossaryReferences(text: string, lang: string) {
        const glossaryTerms = await this.glossaryTranslationRepository.find({
            where: {
                lang
            }
        })
        let result = text
        for (const glossaryTerm of glossaryTerms) {
            if (glossaryTerm.title) {
                // Look for the term's titles that are not already marked
                let regexp = new RegExp(`(?<!<span data-mention-id="\d+" class="mention">)${glossaryTerm.title}`, "gi")
                let match: RegExpExecArray | null
                let initialText = result
                let offset = 0
                while ((match = regexp.exec(result)) !== null) {
                    const index = match.index + offset
                    const lastIndex = regexp.lastIndex + offset
                    // Add the tag to the text
                    const prefixTag = `<span data-mention-id="${glossaryTerm.id}" class="mention">`
                    const suffixTag = "</span>"
                    offset = offset + prefixTag.length + suffixTag.length
                    const first = initialText.substring(0, index)
                    const middle = initialText.substring(index, lastIndex)
                    const last = initialText.substring(lastIndex)
                    initialText = first + prefixTag + middle + suffixTag + last
                }
                result = initialText
            }
        }
        return result
    }
}