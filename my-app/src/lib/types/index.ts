export type GroupType = 'gg' | 'bg' | 'soloist'

export type FilterType = 'all' | 'gg' | 'bg' | 'soloist'

export interface Idol {
    id: string
    name: string
    group: string
    groupType: GroupType
    birthday: string
    nationality: string
    flag: string
    profileColor: string
    imageUrl: string
}

export interface Group {
    name: string
    color: string
    type: GroupType
}