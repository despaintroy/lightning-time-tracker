import { Query, MassModification, EntryChange, ListChange, Modification, Condition, GroupCountQuery, AggregateQuery, GroupAggregateQuery, Aggregate, apiCall, Path } from '@lightningkite/lightning-server-simplified'

export interface Attachment {
    name: string
    file: ServerFile
}
export interface Comment {
    _id: UUID
    user: UUID
    userName: string | null | undefined
    task: UUID
    taskSummary: string | null | undefined
    project: UUID
    projectName: string | null | undefined
    organization: UUID
    organizationName: string | null | undefined
    createdAt: Instant
    content: string
}
export interface EmailPinLogin {
    email: string
    pin: string
}
export interface HealthStatus {
    level: Level
    checkedAt: Instant
    additionalMessage: string | null | undefined
}
type Instant = string  // java.time.Instant
export enum Level {
    OK = "OK",
    WARNING = "WARNING",
    URGENT = "URGENT",
    ERROR = "ERROR",
}
type LocalDate = string  // java.time.LocalDate
export interface Memory {
    max: number
    total: number
    free: number
    systemAllocated: number
    usage: number
}
export interface Organization {
    _id: UUID
    name: string
    createdAt: Instant
}
export interface Project {
    _id: UUID
    organization: UUID
    name: string
    rate: number | null | undefined
    notes: string
    createdAt: Instant
}
type ServerFile = string  // ServerFile
export interface ServerHealth {
    serverId: string
    version: string
    memory: Memory
    features: Record<string, HealthStatus>
    loadAverageCpu: number
}
export interface Task {
    _id: UUID
    project: UUID
    projectName: string | null | undefined
    organization: UUID
    organizationName: string | null | undefined
    user: UUID | null | undefined
    userName: string | null | undefined
    state: TaskState
    summary: string
    description: string
    attachments: Array<Attachment>
    estimate: number | null | undefined
    emergency: boolean
    createdAt: Instant
    createdBy: UUID
    creatorName: string | null | undefined
    pullRequestLink: string | null | undefined
}
export enum TaskState {
    Cancelled = "Cancelled",
    Hold = "Hold",
    Active = "Active",
    PullRequest = "PullRequest",
    Testing = "Testing",
    Approved = "Approved",
    Delivered = "Delivered",
}
export interface TimeEntry {
    _id: UUID
    task: UUID | null | undefined
    taskSummary: string | null | undefined
    project: UUID
    projectName: string | null | undefined
    organization: UUID
    organizationName: string | null | undefined
    user: UUID
    userName: string | null | undefined
    summary: string
    durationMilliseconds: number
    date: LocalDate
}
export interface Timer {
    _id: UUID
    user: UUID
    organization: UUID
    lastStarted: Instant | null | undefined
    accumulatedSeconds: number
    task: UUID | null | undefined
    project: UUID | null | undefined
    summary: string
}
export interface Triple {
}
type UUID = string  // java.util.UUID
export interface UploadInformation {
    uploadUrl: string
    futureCallToken: string
}
export interface User {
    _id: UUID
    email: string
    organization: UUID
    name: string
    webPreferences: string
    isSuperUser: boolean
    role: UserRole | null | undefined
    currentTask: UUID | null | undefined
    projectFavorites: Array<UUID>
    limitToProjects: Array<UUID> | null | undefined
    active: boolean
}
export enum UserRole {
    Owner = "Owner",
    InternalTeamMember = "InternalTeamMember",
    Contractor = "Contractor",
    Client = "Client",
    ExternalTeamMember = "ExternalTeamMember",
}



export interface Api {
    getServerHealth(userToken?: string): Promise<ServerHealth>
    listRecentExceptions(): Promise<Array<Triple>>
    uploadFileForRequest(): Promise<UploadInformation>
    readonly auth: {
        refreshToken(userToken: string): Promise<string>
        getSelf(userToken: string): Promise<User>
        anonymousToken(userToken?: string): Promise<string>
        emailLoginLink(input: string): Promise<void>
        emailPINLogin(input: EmailPinLogin): Promise<string>
    }
    readonly comment: {
        default(userToken: string): Promise<Comment>
        query(input: Query<Comment>, userToken: string): Promise<Array<Comment>>
        detail(id: UUID, userToken: string): Promise<Comment>
        insertBulk(input: Array<Comment>, userToken: string): Promise<Array<Comment>>
        insert(input: Comment, userToken: string): Promise<Comment>
        upsert(id: UUID, input: Comment, userToken: string): Promise<Comment>
        bulkReplace(input: Array<Comment>, userToken: string): Promise<Array<Comment>>
        replace(id: UUID, input: Comment, userToken: string): Promise<Comment>
        bulkModify(input: MassModification<Comment>, userToken: string): Promise<number>
        modifyWithDiff(id: UUID, input: Modification<Comment>, userToken: string): Promise<EntryChange<Comment>>
        modify(id: UUID, input: Modification<Comment>, userToken: string): Promise<Comment>
        bulkDelete(input: Condition<Comment>, userToken: string): Promise<number>
        delete(id: UUID, userToken: string): Promise<void>
        count(input: Condition<Comment>, userToken: string): Promise<number>
        groupCount(input: GroupCountQuery<Comment>, userToken: string): Promise<Record<string, number>>
        aggregate(input: AggregateQuery<Comment>, userToken: string): Promise<number | null | undefined>
        groupAggregate(input: GroupAggregateQuery<Comment>, userToken: string): Promise<Record<string, number | null | undefined>>
    }
    readonly organization: {
        default(userToken: string): Promise<Organization>
        query(input: Query<Organization>, userToken: string): Promise<Array<Organization>>
        detail(id: UUID, userToken: string): Promise<Organization>
        insertBulk(input: Array<Organization>, userToken: string): Promise<Array<Organization>>
        insert(input: Organization, userToken: string): Promise<Organization>
        upsert(id: UUID, input: Organization, userToken: string): Promise<Organization>
        bulkReplace(input: Array<Organization>, userToken: string): Promise<Array<Organization>>
        replace(id: UUID, input: Organization, userToken: string): Promise<Organization>
        bulkModify(input: MassModification<Organization>, userToken: string): Promise<number>
        modifyWithDiff(id: UUID, input: Modification<Organization>, userToken: string): Promise<EntryChange<Organization>>
        modify(id: UUID, input: Modification<Organization>, userToken: string): Promise<Organization>
        bulkDelete(input: Condition<Organization>, userToken: string): Promise<number>
        delete(id: UUID, userToken: string): Promise<void>
        count(input: Condition<Organization>, userToken: string): Promise<number>
        groupCount(input: GroupCountQuery<Organization>, userToken: string): Promise<Record<string, number>>
        aggregate(input: AggregateQuery<Organization>, userToken: string): Promise<number | null | undefined>
        groupAggregate(input: GroupAggregateQuery<Organization>, userToken: string): Promise<Record<string, number | null | undefined>>
    }
    readonly project: {
        default(userToken: string): Promise<Project>
        query(input: Query<Project>, userToken: string): Promise<Array<Project>>
        detail(id: UUID, userToken: string): Promise<Project>
        insertBulk(input: Array<Project>, userToken: string): Promise<Array<Project>>
        insert(input: Project, userToken: string): Promise<Project>
        upsert(id: UUID, input: Project, userToken: string): Promise<Project>
        bulkReplace(input: Array<Project>, userToken: string): Promise<Array<Project>>
        replace(id: UUID, input: Project, userToken: string): Promise<Project>
        bulkModify(input: MassModification<Project>, userToken: string): Promise<number>
        modifyWithDiff(id: UUID, input: Modification<Project>, userToken: string): Promise<EntryChange<Project>>
        modify(id: UUID, input: Modification<Project>, userToken: string): Promise<Project>
        bulkDelete(input: Condition<Project>, userToken: string): Promise<number>
        delete(id: UUID, userToken: string): Promise<void>
        count(input: Condition<Project>, userToken: string): Promise<number>
        groupCount(input: GroupCountQuery<Project>, userToken: string): Promise<Record<string, number>>
        aggregate(input: AggregateQuery<Project>, userToken: string): Promise<number | null | undefined>
        groupAggregate(input: GroupAggregateQuery<Project>, userToken: string): Promise<Record<string, number | null | undefined>>
    }
    readonly task: {
        default(userToken: string): Promise<Task>
        query(input: Query<Task>, userToken: string): Promise<Array<Task>>
        detail(id: UUID, userToken: string): Promise<Task>
        insertBulk(input: Array<Task>, userToken: string): Promise<Array<Task>>
        insert(input: Task, userToken: string): Promise<Task>
        upsert(id: UUID, input: Task, userToken: string): Promise<Task>
        bulkReplace(input: Array<Task>, userToken: string): Promise<Array<Task>>
        replace(id: UUID, input: Task, userToken: string): Promise<Task>
        bulkModify(input: MassModification<Task>, userToken: string): Promise<number>
        modifyWithDiff(id: UUID, input: Modification<Task>, userToken: string): Promise<EntryChange<Task>>
        modify(id: UUID, input: Modification<Task>, userToken: string): Promise<Task>
        bulkDelete(input: Condition<Task>, userToken: string): Promise<number>
        delete(id: UUID, userToken: string): Promise<void>
        count(input: Condition<Task>, userToken: string): Promise<number>
        groupCount(input: GroupCountQuery<Task>, userToken: string): Promise<Record<string, number>>
        aggregate(input: AggregateQuery<Task>, userToken: string): Promise<number | null | undefined>
        groupAggregate(input: GroupAggregateQuery<Task>, userToken: string): Promise<Record<string, number | null | undefined>>
    }
    readonly timeEntry: {
        default(userToken: string): Promise<TimeEntry>
        query(input: Query<TimeEntry>, userToken: string): Promise<Array<TimeEntry>>
        detail(id: UUID, userToken: string): Promise<TimeEntry>
        insertBulk(input: Array<TimeEntry>, userToken: string): Promise<Array<TimeEntry>>
        insert(input: TimeEntry, userToken: string): Promise<TimeEntry>
        upsert(id: UUID, input: TimeEntry, userToken: string): Promise<TimeEntry>
        bulkReplace(input: Array<TimeEntry>, userToken: string): Promise<Array<TimeEntry>>
        replace(id: UUID, input: TimeEntry, userToken: string): Promise<TimeEntry>
        bulkModify(input: MassModification<TimeEntry>, userToken: string): Promise<number>
        modifyWithDiff(id: UUID, input: Modification<TimeEntry>, userToken: string): Promise<EntryChange<TimeEntry>>
        modify(id: UUID, input: Modification<TimeEntry>, userToken: string): Promise<TimeEntry>
        bulkDelete(input: Condition<TimeEntry>, userToken: string): Promise<number>
        delete(id: UUID, userToken: string): Promise<void>
        count(input: Condition<TimeEntry>, userToken: string): Promise<number>
        groupCount(input: GroupCountQuery<TimeEntry>, userToken: string): Promise<Record<string, number>>
        aggregate(input: AggregateQuery<TimeEntry>, userToken: string): Promise<number | null | undefined>
        groupAggregate(input: GroupAggregateQuery<TimeEntry>, userToken: string): Promise<Record<string, number | null | undefined>>
    }
    readonly timer: {
        default(userToken: string): Promise<Timer>
        query(input: Query<Timer>, userToken: string): Promise<Array<Timer>>
        detail(id: UUID, userToken: string): Promise<Timer>
        insertBulk(input: Array<Timer>, userToken: string): Promise<Array<Timer>>
        insert(input: Timer, userToken: string): Promise<Timer>
        upsert(id: UUID, input: Timer, userToken: string): Promise<Timer>
        bulkReplace(input: Array<Timer>, userToken: string): Promise<Array<Timer>>
        replace(id: UUID, input: Timer, userToken: string): Promise<Timer>
        bulkModify(input: MassModification<Timer>, userToken: string): Promise<number>
        modifyWithDiff(id: UUID, input: Modification<Timer>, userToken: string): Promise<EntryChange<Timer>>
        modify(id: UUID, input: Modification<Timer>, userToken: string): Promise<Timer>
        bulkDelete(input: Condition<Timer>, userToken: string): Promise<number>
        delete(id: UUID, userToken: string): Promise<void>
        count(input: Condition<Timer>, userToken: string): Promise<number>
        groupCount(input: GroupCountQuery<Timer>, userToken: string): Promise<Record<string, number>>
        aggregate(input: AggregateQuery<Timer>, userToken: string): Promise<number | null | undefined>
        groupAggregate(input: GroupAggregateQuery<Timer>, userToken: string): Promise<Record<string, number | null | undefined>>
    }
    readonly user: {
        default(userToken: string): Promise<User>
        query(input: Query<User>, userToken: string): Promise<Array<User>>
        detail(id: UUID, userToken: string): Promise<User>
        insertBulk(input: Array<User>, userToken: string): Promise<Array<User>>
        insert(input: User, userToken: string): Promise<User>
        upsert(id: UUID, input: User, userToken: string): Promise<User>
        bulkReplace(input: Array<User>, userToken: string): Promise<Array<User>>
        replace(id: UUID, input: User, userToken: string): Promise<User>
        bulkModify(input: MassModification<User>, userToken: string): Promise<number>
        modifyWithDiff(id: UUID, input: Modification<User>, userToken: string): Promise<EntryChange<User>>
        modify(id: UUID, input: Modification<User>, userToken: string): Promise<User>
        bulkDelete(input: Condition<User>, userToken: string): Promise<number>
        delete(id: UUID, userToken: string): Promise<void>
        count(input: Condition<User>, userToken: string): Promise<number>
        groupCount(input: GroupCountQuery<User>, userToken: string): Promise<Record<string, number>>
        aggregate(input: AggregateQuery<User>, userToken: string): Promise<number | null | undefined>
        groupAggregate(input: GroupAggregateQuery<User>, userToken: string): Promise<Record<string, number | null | undefined>>
        addProjects(id: UUID, input: Array<UUID>, userToken: string): Promise<User>
        removeProjects(id: UUID, input: Array<UUID>, userToken: string): Promise<User>
    }
}



export class UserSession {
    constructor(public api: Api, public userToken: string) {}
    getServerHealth(): Promise<ServerHealth> { return this.api.getServerHealth(this.userToken) } 
    listRecentExceptions(): Promise<Array<Triple>> { return this.api.listRecentExceptions() } 
    uploadFileForRequest(): Promise<UploadInformation> { return this.api.uploadFileForRequest() } 
    readonly auth = {
        refreshToken: (): Promise<string> => { return this.api.auth.refreshToken(this.userToken) }, 
        getSelf: (): Promise<User> => { return this.api.auth.getSelf(this.userToken) }, 
        anonymousToken: (): Promise<string> => { return this.api.auth.anonymousToken(this.userToken) }, 
        emailLoginLink: (input: string): Promise<void> => { return this.api.auth.emailLoginLink(input) }, 
        emailPINLogin: (input: EmailPinLogin): Promise<string> => { return this.api.auth.emailPINLogin(input) }, 
    }
    readonly comment = {
        default: (): Promise<Comment> => { return this.api.comment.default(this.userToken) }, 
        query: (input: Query<Comment>): Promise<Array<Comment>> => { return this.api.comment.query(input, this.userToken) }, 
        detail: (id: UUID): Promise<Comment> => { return this.api.comment.detail(id, this.userToken) }, 
        insertBulk: (input: Array<Comment>): Promise<Array<Comment>> => { return this.api.comment.insertBulk(input, this.userToken) }, 
        insert: (input: Comment): Promise<Comment> => { return this.api.comment.insert(input, this.userToken) }, 
        upsert: (id: UUID, input: Comment): Promise<Comment> => { return this.api.comment.upsert(id, input, this.userToken) }, 
        bulkReplace: (input: Array<Comment>): Promise<Array<Comment>> => { return this.api.comment.bulkReplace(input, this.userToken) }, 
        replace: (id: UUID, input: Comment): Promise<Comment> => { return this.api.comment.replace(id, input, this.userToken) }, 
        bulkModify: (input: MassModification<Comment>): Promise<number> => { return this.api.comment.bulkModify(input, this.userToken) }, 
        modifyWithDiff: (id: UUID, input: Modification<Comment>): Promise<EntryChange<Comment>> => { return this.api.comment.modifyWithDiff(id, input, this.userToken) }, 
        modify: (id: UUID, input: Modification<Comment>): Promise<Comment> => { return this.api.comment.modify(id, input, this.userToken) }, 
        bulkDelete: (input: Condition<Comment>): Promise<number> => { return this.api.comment.bulkDelete(input, this.userToken) }, 
        delete: (id: UUID): Promise<void> => { return this.api.comment.delete(id, this.userToken) }, 
        count: (input: Condition<Comment>): Promise<number> => { return this.api.comment.count(input, this.userToken) }, 
        groupCount: (input: GroupCountQuery<Comment>): Promise<Record<string, number>> => { return this.api.comment.groupCount(input, this.userToken) }, 
        aggregate: (input: AggregateQuery<Comment>): Promise<number | null | undefined> => { return this.api.comment.aggregate(input, this.userToken) }, 
        groupAggregate: (input: GroupAggregateQuery<Comment>): Promise<Record<string, number | null | undefined>> => { return this.api.comment.groupAggregate(input, this.userToken) }, 
    }
    readonly organization = {
        default: (): Promise<Organization> => { return this.api.organization.default(this.userToken) }, 
        query: (input: Query<Organization>): Promise<Array<Organization>> => { return this.api.organization.query(input, this.userToken) }, 
        detail: (id: UUID): Promise<Organization> => { return this.api.organization.detail(id, this.userToken) }, 
        insertBulk: (input: Array<Organization>): Promise<Array<Organization>> => { return this.api.organization.insertBulk(input, this.userToken) }, 
        insert: (input: Organization): Promise<Organization> => { return this.api.organization.insert(input, this.userToken) }, 
        upsert: (id: UUID, input: Organization): Promise<Organization> => { return this.api.organization.upsert(id, input, this.userToken) }, 
        bulkReplace: (input: Array<Organization>): Promise<Array<Organization>> => { return this.api.organization.bulkReplace(input, this.userToken) }, 
        replace: (id: UUID, input: Organization): Promise<Organization> => { return this.api.organization.replace(id, input, this.userToken) }, 
        bulkModify: (input: MassModification<Organization>): Promise<number> => { return this.api.organization.bulkModify(input, this.userToken) }, 
        modifyWithDiff: (id: UUID, input: Modification<Organization>): Promise<EntryChange<Organization>> => { return this.api.organization.modifyWithDiff(id, input, this.userToken) }, 
        modify: (id: UUID, input: Modification<Organization>): Promise<Organization> => { return this.api.organization.modify(id, input, this.userToken) }, 
        bulkDelete: (input: Condition<Organization>): Promise<number> => { return this.api.organization.bulkDelete(input, this.userToken) }, 
        delete: (id: UUID): Promise<void> => { return this.api.organization.delete(id, this.userToken) }, 
        count: (input: Condition<Organization>): Promise<number> => { return this.api.organization.count(input, this.userToken) }, 
        groupCount: (input: GroupCountQuery<Organization>): Promise<Record<string, number>> => { return this.api.organization.groupCount(input, this.userToken) }, 
        aggregate: (input: AggregateQuery<Organization>): Promise<number | null | undefined> => { return this.api.organization.aggregate(input, this.userToken) }, 
        groupAggregate: (input: GroupAggregateQuery<Organization>): Promise<Record<string, number | null | undefined>> => { return this.api.organization.groupAggregate(input, this.userToken) }, 
    }
    readonly project = {
        default: (): Promise<Project> => { return this.api.project.default(this.userToken) }, 
        query: (input: Query<Project>): Promise<Array<Project>> => { return this.api.project.query(input, this.userToken) }, 
        detail: (id: UUID): Promise<Project> => { return this.api.project.detail(id, this.userToken) }, 
        insertBulk: (input: Array<Project>): Promise<Array<Project>> => { return this.api.project.insertBulk(input, this.userToken) }, 
        insert: (input: Project): Promise<Project> => { return this.api.project.insert(input, this.userToken) }, 
        upsert: (id: UUID, input: Project): Promise<Project> => { return this.api.project.upsert(id, input, this.userToken) }, 
        bulkReplace: (input: Array<Project>): Promise<Array<Project>> => { return this.api.project.bulkReplace(input, this.userToken) }, 
        replace: (id: UUID, input: Project): Promise<Project> => { return this.api.project.replace(id, input, this.userToken) }, 
        bulkModify: (input: MassModification<Project>): Promise<number> => { return this.api.project.bulkModify(input, this.userToken) }, 
        modifyWithDiff: (id: UUID, input: Modification<Project>): Promise<EntryChange<Project>> => { return this.api.project.modifyWithDiff(id, input, this.userToken) }, 
        modify: (id: UUID, input: Modification<Project>): Promise<Project> => { return this.api.project.modify(id, input, this.userToken) }, 
        bulkDelete: (input: Condition<Project>): Promise<number> => { return this.api.project.bulkDelete(input, this.userToken) }, 
        delete: (id: UUID): Promise<void> => { return this.api.project.delete(id, this.userToken) }, 
        count: (input: Condition<Project>): Promise<number> => { return this.api.project.count(input, this.userToken) }, 
        groupCount: (input: GroupCountQuery<Project>): Promise<Record<string, number>> => { return this.api.project.groupCount(input, this.userToken) }, 
        aggregate: (input: AggregateQuery<Project>): Promise<number | null | undefined> => { return this.api.project.aggregate(input, this.userToken) }, 
        groupAggregate: (input: GroupAggregateQuery<Project>): Promise<Record<string, number | null | undefined>> => { return this.api.project.groupAggregate(input, this.userToken) }, 
    }
    readonly task = {
        default: (): Promise<Task> => { return this.api.task.default(this.userToken) }, 
        query: (input: Query<Task>): Promise<Array<Task>> => { return this.api.task.query(input, this.userToken) }, 
        detail: (id: UUID): Promise<Task> => { return this.api.task.detail(id, this.userToken) }, 
        insertBulk: (input: Array<Task>): Promise<Array<Task>> => { return this.api.task.insertBulk(input, this.userToken) }, 
        insert: (input: Task): Promise<Task> => { return this.api.task.insert(input, this.userToken) }, 
        upsert: (id: UUID, input: Task): Promise<Task> => { return this.api.task.upsert(id, input, this.userToken) }, 
        bulkReplace: (input: Array<Task>): Promise<Array<Task>> => { return this.api.task.bulkReplace(input, this.userToken) }, 
        replace: (id: UUID, input: Task): Promise<Task> => { return this.api.task.replace(id, input, this.userToken) }, 
        bulkModify: (input: MassModification<Task>): Promise<number> => { return this.api.task.bulkModify(input, this.userToken) }, 
        modifyWithDiff: (id: UUID, input: Modification<Task>): Promise<EntryChange<Task>> => { return this.api.task.modifyWithDiff(id, input, this.userToken) }, 
        modify: (id: UUID, input: Modification<Task>): Promise<Task> => { return this.api.task.modify(id, input, this.userToken) }, 
        bulkDelete: (input: Condition<Task>): Promise<number> => { return this.api.task.bulkDelete(input, this.userToken) }, 
        delete: (id: UUID): Promise<void> => { return this.api.task.delete(id, this.userToken) }, 
        count: (input: Condition<Task>): Promise<number> => { return this.api.task.count(input, this.userToken) }, 
        groupCount: (input: GroupCountQuery<Task>): Promise<Record<string, number>> => { return this.api.task.groupCount(input, this.userToken) }, 
        aggregate: (input: AggregateQuery<Task>): Promise<number | null | undefined> => { return this.api.task.aggregate(input, this.userToken) }, 
        groupAggregate: (input: GroupAggregateQuery<Task>): Promise<Record<string, number | null | undefined>> => { return this.api.task.groupAggregate(input, this.userToken) }, 
    }
    readonly timeEntry = {
        default: (): Promise<TimeEntry> => { return this.api.timeEntry.default(this.userToken) }, 
        query: (input: Query<TimeEntry>): Promise<Array<TimeEntry>> => { return this.api.timeEntry.query(input, this.userToken) }, 
        detail: (id: UUID): Promise<TimeEntry> => { return this.api.timeEntry.detail(id, this.userToken) }, 
        insertBulk: (input: Array<TimeEntry>): Promise<Array<TimeEntry>> => { return this.api.timeEntry.insertBulk(input, this.userToken) }, 
        insert: (input: TimeEntry): Promise<TimeEntry> => { return this.api.timeEntry.insert(input, this.userToken) }, 
        upsert: (id: UUID, input: TimeEntry): Promise<TimeEntry> => { return this.api.timeEntry.upsert(id, input, this.userToken) }, 
        bulkReplace: (input: Array<TimeEntry>): Promise<Array<TimeEntry>> => { return this.api.timeEntry.bulkReplace(input, this.userToken) }, 
        replace: (id: UUID, input: TimeEntry): Promise<TimeEntry> => { return this.api.timeEntry.replace(id, input, this.userToken) }, 
        bulkModify: (input: MassModification<TimeEntry>): Promise<number> => { return this.api.timeEntry.bulkModify(input, this.userToken) }, 
        modifyWithDiff: (id: UUID, input: Modification<TimeEntry>): Promise<EntryChange<TimeEntry>> => { return this.api.timeEntry.modifyWithDiff(id, input, this.userToken) }, 
        modify: (id: UUID, input: Modification<TimeEntry>): Promise<TimeEntry> => { return this.api.timeEntry.modify(id, input, this.userToken) }, 
        bulkDelete: (input: Condition<TimeEntry>): Promise<number> => { return this.api.timeEntry.bulkDelete(input, this.userToken) }, 
        delete: (id: UUID): Promise<void> => { return this.api.timeEntry.delete(id, this.userToken) }, 
        count: (input: Condition<TimeEntry>): Promise<number> => { return this.api.timeEntry.count(input, this.userToken) }, 
        groupCount: (input: GroupCountQuery<TimeEntry>): Promise<Record<string, number>> => { return this.api.timeEntry.groupCount(input, this.userToken) }, 
        aggregate: (input: AggregateQuery<TimeEntry>): Promise<number | null | undefined> => { return this.api.timeEntry.aggregate(input, this.userToken) }, 
        groupAggregate: (input: GroupAggregateQuery<TimeEntry>): Promise<Record<string, number | null | undefined>> => { return this.api.timeEntry.groupAggregate(input, this.userToken) }, 
    }
    readonly timer = {
        default: (): Promise<Timer> => { return this.api.timer.default(this.userToken) }, 
        query: (input: Query<Timer>): Promise<Array<Timer>> => { return this.api.timer.query(input, this.userToken) }, 
        detail: (id: UUID): Promise<Timer> => { return this.api.timer.detail(id, this.userToken) }, 
        insertBulk: (input: Array<Timer>): Promise<Array<Timer>> => { return this.api.timer.insertBulk(input, this.userToken) }, 
        insert: (input: Timer): Promise<Timer> => { return this.api.timer.insert(input, this.userToken) }, 
        upsert: (id: UUID, input: Timer): Promise<Timer> => { return this.api.timer.upsert(id, input, this.userToken) }, 
        bulkReplace: (input: Array<Timer>): Promise<Array<Timer>> => { return this.api.timer.bulkReplace(input, this.userToken) }, 
        replace: (id: UUID, input: Timer): Promise<Timer> => { return this.api.timer.replace(id, input, this.userToken) }, 
        bulkModify: (input: MassModification<Timer>): Promise<number> => { return this.api.timer.bulkModify(input, this.userToken) }, 
        modifyWithDiff: (id: UUID, input: Modification<Timer>): Promise<EntryChange<Timer>> => { return this.api.timer.modifyWithDiff(id, input, this.userToken) }, 
        modify: (id: UUID, input: Modification<Timer>): Promise<Timer> => { return this.api.timer.modify(id, input, this.userToken) }, 
        bulkDelete: (input: Condition<Timer>): Promise<number> => { return this.api.timer.bulkDelete(input, this.userToken) }, 
        delete: (id: UUID): Promise<void> => { return this.api.timer.delete(id, this.userToken) }, 
        count: (input: Condition<Timer>): Promise<number> => { return this.api.timer.count(input, this.userToken) }, 
        groupCount: (input: GroupCountQuery<Timer>): Promise<Record<string, number>> => { return this.api.timer.groupCount(input, this.userToken) }, 
        aggregate: (input: AggregateQuery<Timer>): Promise<number | null | undefined> => { return this.api.timer.aggregate(input, this.userToken) }, 
        groupAggregate: (input: GroupAggregateQuery<Timer>): Promise<Record<string, number | null | undefined>> => { return this.api.timer.groupAggregate(input, this.userToken) }, 
    }
    readonly user = {
        default: (): Promise<User> => { return this.api.user.default(this.userToken) }, 
        query: (input: Query<User>): Promise<Array<User>> => { return this.api.user.query(input, this.userToken) }, 
        detail: (id: UUID): Promise<User> => { return this.api.user.detail(id, this.userToken) }, 
        insertBulk: (input: Array<User>): Promise<Array<User>> => { return this.api.user.insertBulk(input, this.userToken) }, 
        insert: (input: User): Promise<User> => { return this.api.user.insert(input, this.userToken) }, 
        upsert: (id: UUID, input: User): Promise<User> => { return this.api.user.upsert(id, input, this.userToken) }, 
        bulkReplace: (input: Array<User>): Promise<Array<User>> => { return this.api.user.bulkReplace(input, this.userToken) }, 
        replace: (id: UUID, input: User): Promise<User> => { return this.api.user.replace(id, input, this.userToken) }, 
        bulkModify: (input: MassModification<User>): Promise<number> => { return this.api.user.bulkModify(input, this.userToken) }, 
        modifyWithDiff: (id: UUID, input: Modification<User>): Promise<EntryChange<User>> => { return this.api.user.modifyWithDiff(id, input, this.userToken) }, 
        modify: (id: UUID, input: Modification<User>): Promise<User> => { return this.api.user.modify(id, input, this.userToken) }, 
        bulkDelete: (input: Condition<User>): Promise<number> => { return this.api.user.bulkDelete(input, this.userToken) }, 
        delete: (id: UUID): Promise<void> => { return this.api.user.delete(id, this.userToken) }, 
        count: (input: Condition<User>): Promise<number> => { return this.api.user.count(input, this.userToken) }, 
        groupCount: (input: GroupCountQuery<User>): Promise<Record<string, number>> => { return this.api.user.groupCount(input, this.userToken) }, 
        aggregate: (input: AggregateQuery<User>): Promise<number | null | undefined> => { return this.api.user.aggregate(input, this.userToken) }, 
        groupAggregate: (input: GroupAggregateQuery<User>): Promise<Record<string, number | null | undefined>> => { return this.api.user.groupAggregate(input, this.userToken) }, 
        addProjects: (id: UUID, input: Array<UUID>): Promise<User> => { return this.api.user.addProjects(id, input, this.userToken) }, 
        removeProjects: (id: UUID, input: Array<UUID>): Promise<User> => { return this.api.user.removeProjects(id, input, this.userToken) }, 
    }
}




export class LiveApi implements Api {
    public constructor(public httpUrl: string, public socketUrl: string = httpUrl, public extraHeaders: Record<string, string> = {}, public responseInterceptors?: (x: Response)=>Response) {}
    getServerHealth(userToken?: string): Promise<ServerHealth> {
        return apiCall(
            `${this.httpUrl}/meta/health`,
            undefined,
            {
                method: "GET",
                headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
            }, 
            undefined,
            this.responseInterceptors, 
        ).then(x => x.json())
    }
    listRecentExceptions(): Promise<Array<Triple>> {
        return apiCall(
            `${this.httpUrl}/exceptions`,
            undefined,
            {
                method: "GET",
            }, 
            undefined,
            this.responseInterceptors, 
        ).then(x => x.json())
    }
    uploadFileForRequest(): Promise<UploadInformation> {
        return apiCall(
            `${this.httpUrl}/upload-early`,
            undefined,
            {
                method: "GET",
            }, 
            undefined,
            this.responseInterceptors, 
        ).then(x => x.json())
    }
    readonly auth = {
        refreshToken: (userToken: string): Promise<string> => {
            return apiCall(
                `${this.httpUrl}/auth/refresh-token`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        getSelf: (userToken: string): Promise<User> => {
            return apiCall(
                `${this.httpUrl}/auth/self`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        anonymousToken: (userToken?: string): Promise<string> => {
            return apiCall(
                `${this.httpUrl}/auth/anonymous`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        emailLoginLink: (input: string): Promise<void> => {
            return apiCall(
                `${this.httpUrl}/auth/login-email`,
                input,
                {
                    method: "POST",
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => undefined)
        },
        emailPINLogin: (input: EmailPinLogin): Promise<string> => {
            return apiCall(
                `${this.httpUrl}/auth/login-email-pin`,
                input,
                {
                    method: "POST",
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
    }
    readonly comment = {
        default: (userToken: string): Promise<Comment> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/_default_`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        query: (input: Query<Comment>, userToken: string): Promise<Array<Comment>> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/query`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        detail: (id: UUID, userToken: string): Promise<Comment> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/${id}`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insertBulk: (input: Array<Comment>, userToken: string): Promise<Array<Comment>> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/bulk`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insert: (input: Comment, userToken: string): Promise<Comment> => {
            return apiCall(
                `${this.httpUrl}/comments/rest`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        upsert: (id: UUID, input: Comment, userToken: string): Promise<Comment> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/${id}`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkReplace: (input: Array<Comment>, userToken: string): Promise<Array<Comment>> => {
            return apiCall(
                `${this.httpUrl}/comments/rest`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        replace: (id: UUID, input: Comment, userToken: string): Promise<Comment> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/${id}`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkModify: (input: MassModification<Comment>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/bulk`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modifyWithDiff: (id: UUID, input: Modification<Comment>, userToken: string): Promise<EntryChange<Comment>> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/${id}/delta`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modify: (id: UUID, input: Modification<Comment>, userToken: string): Promise<Comment> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/${id}`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkDelete: (input: Condition<Comment>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/bulk-delete`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        delete: (id: UUID, userToken: string): Promise<void> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/${id}`,
                undefined,
                {
                    method: "DELETE",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => undefined)
        },
        count: (input: Condition<Comment>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupCount: (input: GroupCountQuery<Comment>, userToken: string): Promise<Record<string, number>> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/group-count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        aggregate: (input: AggregateQuery<Comment>, userToken: string): Promise<number | null | undefined> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupAggregate: (input: GroupAggregateQuery<Comment>, userToken: string): Promise<Record<string, number | null | undefined>> => {
            return apiCall(
                `${this.httpUrl}/comments/rest/group-aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
    }
    readonly organization = {
        default: (userToken: string): Promise<Organization> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/_default_`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        query: (input: Query<Organization>, userToken: string): Promise<Array<Organization>> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/query`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        detail: (id: UUID, userToken: string): Promise<Organization> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/${id}`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insertBulk: (input: Array<Organization>, userToken: string): Promise<Array<Organization>> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/bulk`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insert: (input: Organization, userToken: string): Promise<Organization> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        upsert: (id: UUID, input: Organization, userToken: string): Promise<Organization> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/${id}`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkReplace: (input: Array<Organization>, userToken: string): Promise<Array<Organization>> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        replace: (id: UUID, input: Organization, userToken: string): Promise<Organization> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/${id}`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkModify: (input: MassModification<Organization>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/bulk`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modifyWithDiff: (id: UUID, input: Modification<Organization>, userToken: string): Promise<EntryChange<Organization>> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/${id}/delta`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modify: (id: UUID, input: Modification<Organization>, userToken: string): Promise<Organization> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/${id}`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkDelete: (input: Condition<Organization>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/bulk-delete`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        delete: (id: UUID, userToken: string): Promise<void> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/${id}`,
                undefined,
                {
                    method: "DELETE",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => undefined)
        },
        count: (input: Condition<Organization>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupCount: (input: GroupCountQuery<Organization>, userToken: string): Promise<Record<string, number>> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/group-count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        aggregate: (input: AggregateQuery<Organization>, userToken: string): Promise<number | null | undefined> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupAggregate: (input: GroupAggregateQuery<Organization>, userToken: string): Promise<Record<string, number | null | undefined>> => {
            return apiCall(
                `${this.httpUrl}/organizations/rest/group-aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
    }
    readonly project = {
        default: (userToken: string): Promise<Project> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/_default_`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        query: (input: Query<Project>, userToken: string): Promise<Array<Project>> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/query`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        detail: (id: UUID, userToken: string): Promise<Project> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/${id}`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insertBulk: (input: Array<Project>, userToken: string): Promise<Array<Project>> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/bulk`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insert: (input: Project, userToken: string): Promise<Project> => {
            return apiCall(
                `${this.httpUrl}/projects/rest`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        upsert: (id: UUID, input: Project, userToken: string): Promise<Project> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/${id}`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkReplace: (input: Array<Project>, userToken: string): Promise<Array<Project>> => {
            return apiCall(
                `${this.httpUrl}/projects/rest`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        replace: (id: UUID, input: Project, userToken: string): Promise<Project> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/${id}`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkModify: (input: MassModification<Project>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/bulk`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modifyWithDiff: (id: UUID, input: Modification<Project>, userToken: string): Promise<EntryChange<Project>> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/${id}/delta`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modify: (id: UUID, input: Modification<Project>, userToken: string): Promise<Project> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/${id}`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkDelete: (input: Condition<Project>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/bulk-delete`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        delete: (id: UUID, userToken: string): Promise<void> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/${id}`,
                undefined,
                {
                    method: "DELETE",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => undefined)
        },
        count: (input: Condition<Project>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupCount: (input: GroupCountQuery<Project>, userToken: string): Promise<Record<string, number>> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/group-count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        aggregate: (input: AggregateQuery<Project>, userToken: string): Promise<number | null | undefined> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupAggregate: (input: GroupAggregateQuery<Project>, userToken: string): Promise<Record<string, number | null | undefined>> => {
            return apiCall(
                `${this.httpUrl}/projects/rest/group-aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
    }
    readonly task = {
        default: (userToken: string): Promise<Task> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/_default_`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        query: (input: Query<Task>, userToken: string): Promise<Array<Task>> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/query`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        detail: (id: UUID, userToken: string): Promise<Task> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/${id}`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insertBulk: (input: Array<Task>, userToken: string): Promise<Array<Task>> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/bulk`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insert: (input: Task, userToken: string): Promise<Task> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        upsert: (id: UUID, input: Task, userToken: string): Promise<Task> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/${id}`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkReplace: (input: Array<Task>, userToken: string): Promise<Array<Task>> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        replace: (id: UUID, input: Task, userToken: string): Promise<Task> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/${id}`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkModify: (input: MassModification<Task>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/bulk`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modifyWithDiff: (id: UUID, input: Modification<Task>, userToken: string): Promise<EntryChange<Task>> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/${id}/delta`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modify: (id: UUID, input: Modification<Task>, userToken: string): Promise<Task> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/${id}`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkDelete: (input: Condition<Task>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/bulk-delete`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        delete: (id: UUID, userToken: string): Promise<void> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/${id}`,
                undefined,
                {
                    method: "DELETE",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => undefined)
        },
        count: (input: Condition<Task>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupCount: (input: GroupCountQuery<Task>, userToken: string): Promise<Record<string, number>> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/group-count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        aggregate: (input: AggregateQuery<Task>, userToken: string): Promise<number | null | undefined> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupAggregate: (input: GroupAggregateQuery<Task>, userToken: string): Promise<Record<string, number | null | undefined>> => {
            return apiCall(
                `${this.httpUrl}/tasks/rest/group-aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
    }
    readonly timeEntry = {
        default: (userToken: string): Promise<TimeEntry> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/_default_`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        query: (input: Query<TimeEntry>, userToken: string): Promise<Array<TimeEntry>> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/query`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        detail: (id: UUID, userToken: string): Promise<TimeEntry> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/${id}`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insertBulk: (input: Array<TimeEntry>, userToken: string): Promise<Array<TimeEntry>> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/bulk`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insert: (input: TimeEntry, userToken: string): Promise<TimeEntry> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        upsert: (id: UUID, input: TimeEntry, userToken: string): Promise<TimeEntry> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/${id}`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkReplace: (input: Array<TimeEntry>, userToken: string): Promise<Array<TimeEntry>> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        replace: (id: UUID, input: TimeEntry, userToken: string): Promise<TimeEntry> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/${id}`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkModify: (input: MassModification<TimeEntry>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/bulk`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modifyWithDiff: (id: UUID, input: Modification<TimeEntry>, userToken: string): Promise<EntryChange<TimeEntry>> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/${id}/delta`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modify: (id: UUID, input: Modification<TimeEntry>, userToken: string): Promise<TimeEntry> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/${id}`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkDelete: (input: Condition<TimeEntry>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/bulk-delete`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        delete: (id: UUID, userToken: string): Promise<void> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/${id}`,
                undefined,
                {
                    method: "DELETE",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => undefined)
        },
        count: (input: Condition<TimeEntry>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupCount: (input: GroupCountQuery<TimeEntry>, userToken: string): Promise<Record<string, number>> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/group-count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        aggregate: (input: AggregateQuery<TimeEntry>, userToken: string): Promise<number | null | undefined> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupAggregate: (input: GroupAggregateQuery<TimeEntry>, userToken: string): Promise<Record<string, number | null | undefined>> => {
            return apiCall(
                `${this.httpUrl}/time-entries/rest/group-aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
    }
    readonly timer = {
        default: (userToken: string): Promise<Timer> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/_default_`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        query: (input: Query<Timer>, userToken: string): Promise<Array<Timer>> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/query`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        detail: (id: UUID, userToken: string): Promise<Timer> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/${id}`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insertBulk: (input: Array<Timer>, userToken: string): Promise<Array<Timer>> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/bulk`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insert: (input: Timer, userToken: string): Promise<Timer> => {
            return apiCall(
                `${this.httpUrl}/timers/rest`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        upsert: (id: UUID, input: Timer, userToken: string): Promise<Timer> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/${id}`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkReplace: (input: Array<Timer>, userToken: string): Promise<Array<Timer>> => {
            return apiCall(
                `${this.httpUrl}/timers/rest`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        replace: (id: UUID, input: Timer, userToken: string): Promise<Timer> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/${id}`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkModify: (input: MassModification<Timer>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/bulk`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modifyWithDiff: (id: UUID, input: Modification<Timer>, userToken: string): Promise<EntryChange<Timer>> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/${id}/delta`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modify: (id: UUID, input: Modification<Timer>, userToken: string): Promise<Timer> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/${id}`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkDelete: (input: Condition<Timer>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/bulk-delete`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        delete: (id: UUID, userToken: string): Promise<void> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/${id}`,
                undefined,
                {
                    method: "DELETE",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => undefined)
        },
        count: (input: Condition<Timer>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupCount: (input: GroupCountQuery<Timer>, userToken: string): Promise<Record<string, number>> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/group-count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        aggregate: (input: AggregateQuery<Timer>, userToken: string): Promise<number | null | undefined> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupAggregate: (input: GroupAggregateQuery<Timer>, userToken: string): Promise<Record<string, number | null | undefined>> => {
            return apiCall(
                `${this.httpUrl}/timers/rest/group-aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
    }
    readonly user = {
        default: (userToken: string): Promise<User> => {
            return apiCall(
                `${this.httpUrl}/users/rest/_default_`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        query: (input: Query<User>, userToken: string): Promise<Array<User>> => {
            return apiCall(
                `${this.httpUrl}/users/rest/query`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        detail: (id: UUID, userToken: string): Promise<User> => {
            return apiCall(
                `${this.httpUrl}/users/rest/${id}`,
                undefined,
                {
                    method: "GET",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insertBulk: (input: Array<User>, userToken: string): Promise<Array<User>> => {
            return apiCall(
                `${this.httpUrl}/users/rest/bulk`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        insert: (input: User, userToken: string): Promise<User> => {
            return apiCall(
                `${this.httpUrl}/users/rest`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        upsert: (id: UUID, input: User, userToken: string): Promise<User> => {
            return apiCall(
                `${this.httpUrl}/users/rest/${id}`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkReplace: (input: Array<User>, userToken: string): Promise<Array<User>> => {
            return apiCall(
                `${this.httpUrl}/users/rest`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        replace: (id: UUID, input: User, userToken: string): Promise<User> => {
            return apiCall(
                `${this.httpUrl}/users/rest/${id}`,
                input,
                {
                    method: "PUT",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkModify: (input: MassModification<User>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/users/rest/bulk`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modifyWithDiff: (id: UUID, input: Modification<User>, userToken: string): Promise<EntryChange<User>> => {
            return apiCall(
                `${this.httpUrl}/users/rest/${id}/delta`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        modify: (id: UUID, input: Modification<User>, userToken: string): Promise<User> => {
            return apiCall(
                `${this.httpUrl}/users/rest/${id}`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        bulkDelete: (input: Condition<User>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/users/rest/bulk-delete`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        delete: (id: UUID, userToken: string): Promise<void> => {
            return apiCall(
                `${this.httpUrl}/users/rest/${id}`,
                undefined,
                {
                    method: "DELETE",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => undefined)
        },
        count: (input: Condition<User>, userToken: string): Promise<number> => {
            return apiCall(
                `${this.httpUrl}/users/rest/count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupCount: (input: GroupCountQuery<User>, userToken: string): Promise<Record<string, number>> => {
            return apiCall(
                `${this.httpUrl}/users/rest/group-count`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        aggregate: (input: AggregateQuery<User>, userToken: string): Promise<number | null | undefined> => {
            return apiCall(
                `${this.httpUrl}/users/rest/aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        groupAggregate: (input: GroupAggregateQuery<User>, userToken: string): Promise<Record<string, number | null | undefined>> => {
            return apiCall(
                `${this.httpUrl}/users/rest/group-aggregate`,
                input,
                {
                    method: "POST",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        addProjects: (id: UUID, input: Array<UUID>, userToken: string): Promise<User> => {
            return apiCall(
                `${this.httpUrl}/users/rest/${id}/add-projects`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
        removeProjects: (id: UUID, input: Array<UUID>, userToken: string): Promise<User> => {
            return apiCall(
                `${this.httpUrl}/users/rest/${id}/remove-projects`,
                input,
                {
                    method: "PATCH",
                    headers: userToken ? { ...this.extraHeaders, "Authorization": `Bearer ${userToken}` } : this.extraHeaders,
                }, 
                undefined,
                this.responseInterceptors, 
            ).then(x => x.json())
        },
    }
}

