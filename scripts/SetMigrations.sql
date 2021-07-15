BEGIN TRANSACTION;

DROP TABLE IF EXISTS public.migrations CASCADE;

CREATE TABLE public.migrations (
    id          integer   NOT NULL,
    "timestamp" bigint    NOT NULL,
    name        VARCHAR   NOT NULL
);

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_Migrations" PRIMARY KEY (id);

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);

INSERT INTO public.migrations ("timestamp", name)
VALUES
	(1594413973851, 'V01MigrateClientStorage1594413973851'),
	(1594582514749, 'V02MigrateDashboardUsers1594582514749'),
	(1594582821724, 'V03MigrateBanners1594582821724'),
	(1594582905434, 'V04MigrateGiveaways1594582905434'),
	(1594583103788, 'V05MigrateGuilds1594583103788'),
	(1594583243068, 'V06MigrateMembers1594583243068'),
	(1594583300041, 'V07MigrateModeration1594583300041'),
	(1594625931497, 'V08MigrateUsers1594625931497'),
	(1594628900945, 'V09MigrateSuggestion1594628900945'),
	(1594629639526, 'V10MigrateTwitchSubscription1594629639526'),
	(1594649287397, 'V11MigrateRpg1594649287397'),
	(1594669268323, 'V12ClearOldTables1594669268323'),
	(1594757329224, 'V13MigrateAnalytics1594757329224'),
	(1594843508131, 'V14FixRpgGuildRankEntity1594843508131'),
	(1594843508131, 'V15ClearDashboardUsers1594922379627'),
	(1595064247769, 'V16CreateSpousesTable1595064247769'),
	(1596269328762, 'V17MigrateModeratorNonNull1596269328762'),
	(1596289368633, 'V18CreateIgnoreLogs1596289368633'),
	(1596299849081, 'V19MigrateReactionRoles1596299849081'),
	(1597088981807, 'V20UpdateGuildEntityChecks1597088981807'),
	(1597266996401, 'V21AddMissingChecks1597266996401'),
	(1598010877863, 'V22AddSelfStarCapabilities1598010877863'),
	(1598083459734, 'V23AddGIData1598083459734'),
	(1599692515073, 'V24RemoveCleanUpTask1599692515073'),
	(1604530387718, 'V25SettingsGatewayRemoval1604530387718'),
	(1605027257347, 'V26RemoveCommandUseCounter1605027257347'),
	(1605297776910, 'V27TextToJsonb1605297776910'),
	(1605460185741, 'V28SuggestionIdRemoveFromGuild1605460185741'),
	(1606138444111, 'V29AttachmentMode1606138444111'),
	(1606138444111, 'V30AttachmentModeChecks1606411800922'),
	(1606650850324, 'V31MultiRole1606650850324'),
	(1606948188150, 'V32SeparatedMemberNameUpdateLogs1606948188150'),
	(1610450637243, 'V33LimitLessLanguageCodes1610450637243'),
	(1610659806881, 'V34IncreasedModerationDurations1610659806881'),
	(1612574048431, 'V35RemoveRaidColumns1612574048431'),
	(1614640993140, 'V36RemoveEveryonePermissionNodes1614640993140'),
	(1615269810077, 'V37BirthdayIntegration1615269810077'),
	(1616108184492, 'V38UpdateBirthdayIntegration1616108184492'),
	(1616168146993, 'V39RenamePropertiesToKebabCase1616168146993'),
	(1616188199786, 'V40AddSocialIgnoredRoles1616188199786'),
	(1616191193015, 'V41AddMusicAllowedVoiceChannelsAndRoles1616191193015'),
	(1616201639503, 'V42AddAllowedRolesIntoGiveaways1616201639503'),
	(1616786337398, 'V43RemovedReferencesToUndesiredWords1616786337398'),
	(1617272351741, 'V44AddAutoDeleteIgnoreOptions1617272351741'),
	(1617297815771, 'V45AddAliasesArrayToTags1617297815771'),
	(1617314282232, 'V46AddStarboardMaximumAge1617314282232'),
	(1617645345960, 'V47AddNewLogsChannels1617645345960'),
	(1617890802896, 'V48AddSeparateInitialRoles1617890802896'),
	(1618562933625, 'V49StripConfusablesFromWordFilter1618562933625'),
	(1618951687674, 'V50RemoveDatabaseChecks1618951687674'),
	(1619089555427, 'V51NewSocialFeaturesAndValueRename1619089555427'),
	(1619969827210, 'V52JoinAndLeaveMessageAutoDelete1619969827210'),
	(1620050724729, 'V53AfkSettings1620050724729'),
	(1626169505546, 'V54EventsModernization1626169505546');

COMMIT;
