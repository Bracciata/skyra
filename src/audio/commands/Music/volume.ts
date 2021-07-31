import { AudioCommand, RequireMusicPlaying, RequireSameVoiceChannel, RequireSkyraInVoiceChannel, RequireUserInVoiceChannel } from '#lib/audio';
import { LanguageKeys } from '#lib/i18n/languageKeys';
import type { GuildMessage } from '#lib/types';
import { Events } from '#lib/types/Enums';
import { canManage, getListeners } from '#utils/functions';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<AudioCommand.Options>({
	aliases: ['vol'],
	description: LanguageKeys.Commands.Music.VolumeDescription,
	extendedHelp: LanguageKeys.Commands.Music.VolumeExtended
})
export class UserMusicCommand extends AudioCommand {
	@RequireUserInVoiceChannel()
	@RequireSkyraInVoiceChannel()
	@RequireSameVoiceChannel()
	@RequireMusicPlaying()
	public async run(message: GuildMessage, args: AudioCommand.Args) {
		const { audio } = message.guild;
		const newVolume = args.finished ? null : await args.pick('integer', { minimum: 0, maximum: 300 });
		const previousVolume = await audio.getVolume();

		// If no argument was given
		if (newVolume === null || newVolume === previousVolume) {
			return message.send(args.t(LanguageKeys.Commands.Music.VolumeSuccess, { volume: previousVolume }));
		}

		const channel = audio.voiceChannel!;
		if (getListeners(channel).length >= 4 && !(await canManage(message.member, channel))) {
			this.error(LanguageKeys.Preconditions.MusicDjMember);
		}

		// Set the volume
		await audio.setVolume(newVolume);
		return this.container.client.emit(Events.MusicSongVolumeUpdateNotify, message, previousVolume, newVolume);
	}
}
