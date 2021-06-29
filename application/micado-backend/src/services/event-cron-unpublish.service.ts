import { bind, BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import cron from 'node-cron';
import {
  EventRepository,
  EventTranslationProdRepository,
  EventTranslationRepository,
} from '../repositories';

/**
 * Sets up cron job every minute to delete events which end date has already passed
 */
@bind({ scope: BindingScope.TRANSIENT })
export class EventCronUnpublishService {

  constructor(
    @repository(EventRepository)
    public eventRepository: EventRepository,
    @repository(EventTranslationRepository)
    public eventTranslationRepository: EventTranslationRepository,
    @repository(EventTranslationProdRepository)
    public eventTranslationProdRepository: EventTranslationProdRepository,
  ) { }

  async start() {
    this.scheduleCron()
  }

  private async scheduleCron() {
    console.log("Started Event Deleter Cron")

    cron.schedule('* * * * *', async () => {
      await this.cleanEvents()
    })
  }

  private async cleanEvents() {
    const currentDate = new Date().toISOString()
    let itemsToUpdate = await this.eventRepository.find({
      fields: { id: true },
      where: {
        published: true,
        endDate: { lt: currentDate }
      }
    })
    let idsToUpdate = itemsToUpdate.map((e) => e.id)
    if (idsToUpdate.length > 0) {
      let promises = []
      // Set all translations' states to 0
      promises.push(this.eventTranslationRepository.updateAll({ translationState: 0 }, { id: { inq: idsToUpdate } }))
      // Delete all translations in prod
      promises.push(this.eventTranslationProdRepository.deleteAll({ id: { inq: idsToUpdate } }))
      // Set published to false
      promises.push(this.eventRepository.updateAll({ published: false }, { id: { inq: idsToUpdate } }))
      await Promise.all(promises)
    }
  }
}
