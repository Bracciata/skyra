export const enum Events {
	AnalyticsSync = 'analyticsSync',
	Error = 'error',
	PreMessageParsed = 'preMessageParsed',
	ArgumentError = 'argumentError',
	CommandError = 'commandError',
	CommandInhibited = 'commandInhibited',
	CommandRun = 'commandRun',
	CommandDenied = 'commandDenied',
	CommandSuccess = 'commandSuccess',
	CommandUnknown = 'commandUnknown',
	CommandUsageAnalytics = 'commandUsageAnalytics',
	CoreSettingsDelete = 'coreSettingsDelete',
	CoreSettingsUpdate = 'coreSettingsUpdate',
	Disconnect = 'disconnect',
	EventError = 'eventError',
	GuildAnnouncementEdit = 'guildAnnouncementEdit',
	GuildAnnouncementError = 'guildAnnouncementError',
	GuildAnnouncementSend = 'guildAnnouncementSend',
	GuildBanAdd = 'guildBanAdd',
	GuildBanRemove = 'guildBanRemove',
	GuildCreate = 'guildCreate',
	GuildDelete = 'guildDelete',
	GuildMemberUpdate = 'guildMemberUpdate',
	GuildMessageDelete = 'guildMessageDelete',
	GuildMessageLog = 'guildMessageLog',
	GuildMessageUpdate = 'guildMessageUpdate',
	GuildUserMessage = 'guildUserMessage',
	GuildUserMessageSocialPointsAddUser = 'guildUserMessageSocialPointsAddUser',
	GuildUserMessageSocialPointsAddMember = 'guildUserMessageSocialPointsAddMember',
	GuildUserMessageSocialPointsAddMemberReward = 'guildUserMessageSocialPointsAddMemberReward',
	LavalinkClose = 'lavalinkClose',
	LavalinkEnd = 'lavalinkEnd',
	LavalinkException = 'lavalinkException',
	LavalinkPlayerUpdate = 'lavalinkPlayerUpdate',
	LavalinkStart = 'lavalinkStart',
	LavalinkStuck = 'lavalinkStuck',
	LavalinkWebsocketClosed = 'lavalinkWebsocketClosed',
	MentionSpamExceeded = 'mentionSpamExceeded',
	MentionSpamWarning = 'mentionSpamWarning',
	MessageCreate = 'messageCreate',
	MessageDelete = 'messageDelete',
	MessageDeleteBulk = 'messageDeleteBulk',
	MessageUpdate = 'messageUpdate',
	ModerationEntryAdd = 'moderationEntryAdd',
	ModerationEntryEdit = 'moderationEntryEdit',
	MoneyPayment = 'moneyPayment',
	MoneyTransaction = 'moneyTransaction',
	MusicAddNotify = 'musicAddNotify',
	MusicConnect = 'musicConnect',
	MusicFinish = 'musicFinish',
	MusicFinishNotify = 'musicFinishNotify',
	MusicLeave = 'musicLeave',
	MusicPrune = 'musicPrune',
	MusicQueueSync = 'musicQueueSync',
	MusicRemove = 'musicRemove',
	MusicRemoveNotify = 'musicRemoveNotify',
	MusicReplayUpdate = 'musicReplayUpdate',
	MusicReplayUpdateNotify = 'musicReplayUpdateNotify',
	MusicSongPause = 'musicSongPause',
	MusicSongPauseNotify = 'musicSongPauseNotify',
	MusicSongPlay = 'musicSongPlay',
	MusicSongPlayNotify = 'musicSongPlayNotify',
	MusicSongReplay = 'musicSongReplay',
	MusicSongResume = 'musicSongResume',
	MusicSongResumeNotify = 'musicSongResumeNotify',
	MusicSongSeekUpdate = 'musicSongSeekUpdate',
	MusicSongSeekUpdateNotify = 'musicSongSeekUpdateNotify',
	MusicSongSkip = 'musicSongSkip',
	MusicSongSkipNotify = 'musicSongSkipNotify',
	MusicSongVolumeUpdate = 'musicSongVolumeUpdate',
	MusicSongVolumeUpdateNotify = 'musicSongVolumeUpdateNotify',
	MusicVoiceChannelJoin = 'musicVoiceChannelJoin',
	MusicVoiceChannelLeave = 'musicVoiceChannelLeave',
	NotMutedMemberAdd = 'notMutedMemberAdd',
	Raw = 'raw',
	RawMemberAdd = 'rawMemberAdd',
	RawMemberRemove = 'rawMemberRemove',
	RawMessageCreate = 'rawMessageCreate',
	RawMessageDelete = 'rawMessageDelete',
	RawMessageDeleteBulk = 'rawMessageDeleteBulk',
	RawReactionAdd = 'rawReactionAdd',
	RawReactionAddRole = 'rawReactionAddRole',
	RawReactionRemoveRole = 'rawReactionRemoveRole',
	ReactionBlocked = 'reactionBlocked',
	Reconnecting = 'reconnecting',
	ResourceAnalyticsSync = 'resourceAnalyticsSync',
	SettingsUpdate = 'settingsUpdate',
	TaskError = 'taskError',
	TwitchStreamHookedAnalytics = 'twitchStreamHookedAnalytics',
	TwitchStreamOffline = 'twitchStreamOffline',
	TwitchStreamOnline = 'twitchStreamOnline',
	UnhandledRejection = 'unhandledRejection',
	UserMessage = 'userMessage'
}

export const enum PermissionLevels {
	Everyone = 0,
	Moderator = 5,
	Administrator = 6,
	ServerOwner = 7,
	BotOwner = 10
}

export const enum Schedules {
	DelayedGiveawayCreate = 'delayedGiveawayCreate',
	Poststats = 'poststats',
	SyncResourceAnalytics = 'syncResourceAnalytics',
	Reminder = 'reminder'
}
