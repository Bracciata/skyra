const Rethink = require("../providers/rethink");
const Moderation = require("./moderation");
const GuildManager = require("./guildManager");

const defaults = {
    prefix: "s!",
    roles: {},
    events: {},
    channels: {},
    messages: {},
    selfmod: {},

    ignoreChannels: [],
    disabledCommands: [],
    disabledCmdChannels: [],
    publicRoles: [],
    autoroles: [],

    mode: 0,
    wordFilter: 0,
    initialRole: null,
    social: {
        boost: 1,
        monitorBoost: 1,
    },
};

/* eslint-disable no-restricted-syntax */
const GuildSetting = class GuildSetting {
    constructor(guild, data) {
        Object.defineProperty(this, "raw", { value: data });
        this.id = guild;
        this.prefix = this.raw.prefix || defaults.prefix;

        this.roles = this.raw.roles || defaults.roles;
        this.events = this.raw.events || defaults.events;
        this.channels = this.raw.channels || defaults.channels;
        this.messages = this.raw.messages || defaults.messages;
        this.selfmod = this.raw.selfmod || defaults.selfmod;

        this.ignoreChannels = this.raw.ignoreChannels || defaults.ignoreChannels;
        this.disabledCommands = this.raw.disabledCommands || defaults.disabledCommands;
        this.disabledCmdChannels = this.raw.disabledCmdChannels || defaults.disabledCmdChannels;
        this.publicRoles = this.raw.publicRoles || defaults.publicRoles;
        this.autoroles = this.raw.autoroles || defaults.autoroles;

        this.mode = this.raw.mode || defaults.mode;
        this.wordFilter = this.raw.wordFilter || defaults.wordFilter;
        this.initialRole = this.raw.initialRole || defaults.initialRole;
        this.social = {
            boost: this.raw.boost || defaults.social.boost,
            monitorBoost: this.raw.monitorBoost || defaults.social.monitorBoost,
        };

        this.exists = this.raw.exists || true;

        this.moderation = new Moderation(this.id, this.raw.mutes || []);
    }

    async create() {
        if (this.exists) throw "This GuildSetting already exists.";
        this.raw = Object.assign(defaults, { id: this.id, exists: true });
        await Rethink.create("guilds", this.raw).catch((err) => { throw err; });
        return true;
    }

    ensureConfigs() {
        return !this.exists ? this.create() : false;
    }

    async update(doc) {
        await this.ensureConfigs();
        await Rethink.update("guilds", this.id, doc);
        for (const key of Object.keys(doc)) {
            if (doc[key] instanceof Object) {
                for (const subkey of Object.keys(doc[key])) this[key][subkey] = doc[key][subkey];
            } else {
                this[key] = doc[key];
            }
        }
        return this;
    }

    async destroy() {
        if (!this.exists) throw "This GuildConfig does not exist.";
        await Rethink.delete("guilds", this.id);
        GuildManager.delete(this.id);
        return true;
    }

    get createdAt() {
        return this.raw.createdAt || null;
    }
};

module.exports = { GuildSetting, defaults };
