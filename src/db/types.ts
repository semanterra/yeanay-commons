export type AccessToken = string

/** small integer used to identify legislators within a state/chamber/term
 or a district within a state.  Used for recording votes tersely
 */
export type Ordinal = number

export type UserId = string // Auth0 ID

/* durable uuid-style user id gen'd by yeanay
   Used to tag non-registered users in LocalStorage, also.
   It's "public" in the sense that it doesn't disclose any user info and thus can be shared
   freely, unlike a UserId.
 */
export type PublicId = string //

export type StateId = string
export type ChamberId = 'upper' | 'lower'
export type ChamberChar = 'l' | 'u'

export interface StateChamber {
    stateId: StateId
    chamberId: ChamberId
}
export type SessionId = string
export type TermId = string

export type BillId = string // an OpenStates bill id, not a state-assigned ID
export type BillName = string // State-level bill ID, e.g. HB 101
export type BillSubject = string // http://docs.openstates.org/en/latest/policies/categorization.html#subject-categorization
export type BillType = string // http://docs.openstates.org/en/latest/policies/categorization.html#bill-types
export type BillActionType = string // http://docs.openstates.org/en/latest/policies/categorization.html#action-categorization

export type DocId = string
export type PrimaryKey = number

export type VoteId = string
export enum VoteValue { NO = -1, OTHER = 0, YES = 1 }
export type VoteCountSet = { [k: number /*in VoteValue*/]: number }

export type NetVoteCount = number // sum of VoteValues; may be negative

export type LegiId = string
export type PartyId = string // todo consider restricting when current set is known
export type DemiParty = 'd' | 'r' | 'o'

export type Motion = string
export type MotionType =
    'AMEND' |
    'APPROVE_SECTION' |
    'END_POSTPONE' |
    'KILL' |
    'OVERRIDE_VETO' |
    'PASS' |
    'PASS_AMENDED' |
    'PASS_COC' |
    'PASS_CONCUR' |
    'POSTPONE' |
    'RECONSIDER' |
    'REREFER' |
    'SEND_TO_COC'

export type DistrictId = string
export type DistrictName = string // unique within state + chamber

export type LongLatArr = [number, number]
export type Geoid = string

export type OfficeType =  'capitol' | 'district'
export type CommitteeId = string

export interface IDed {
    id: PrimaryKey
}

export const chamberIdToChar = (id: ChamberId) => id.substr(0, 1)

export class ChamberType {

    readonly char: ChamberChar

    constructor(readonly _id: ChamberId) {
        this.char = _id.substr(0, 1) as ChamberChar
    }

    get id() {
        return this._id
    }

    expandCensusGeoid(censusGeoid) {
        return `sld${this.char}-${censusGeoid}`
    }

    toString() {
        return 'ChamberType ' + this.char
    }

    get other() {
        return this.char === 'u' ? lowerChamberType : upperChamberType
    }
}

export const upperChamberType = new ChamberType('upper')
export const lowerChamberType = new ChamberType('lower')
export function getChamberType(id: ChamberId) {
    const c = id.substr(0, 1)
    return c === 'u' ? upperChamberType : lowerChamberType
}

export type DistrictTypeId = 'l' | 'u' | 'f'

export class DistrictType {

    constructor(readonly id: DistrictTypeId, readonly chamberType: ChamberType) {
    }

    toString() {
        return 'DistrictType ' + this.id
    }

}

export const lowerDistrictType = new DistrictType('l', lowerChamberType)
export const upperDistrictType = new DistrictType('u', upperChamberType)
export const floterialDistrictType = new DistrictType('f', lowerChamberType)

const districtTypes = [lowerDistrictType, upperDistrictType, floterialDistrictType]
export const districtTypesById: {[key in DistrictTypeId]:DistrictType} = {
    l: lowerDistrictType,
    u: upperDistrictType,
    f: floterialDistrictType
}
