import { KlasaMessage, Monitor } from 'klasa';
import { GuildSettingsTriggerIncludes } from '../lib/types/Misc';

export default class extends Monitor {

	public async run(message: KlasaMessage): Promise<void> {
		const content = message.content.toLowerCase();
		const trigger = (message.guild.settings.get('trigger.includes') as GuildSettingsTriggerIncludes).find((trg) => content.includes(trg.input));
		if (trigger && trigger.action === 'react') {
			if (message.reactable) {
				await message.react(trigger.output)
					.catch((error) => { if (error.code !== 10008) this.client.emit('apiError', error); });
			}
		}
	}

	public shouldRun(message: KlasaMessage): boolean {
		return this.enabled
			&& message.editedTimestamp === null
			&& message.guild
			&& message.author.bot === false
			&& message.author.id !== this.client.user.id
			&& (message.guild.settings.get('trigger.includes') as GuildSettingsTriggerIncludes).length !== 0;
	}

}
