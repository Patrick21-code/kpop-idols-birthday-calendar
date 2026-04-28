import { groups } from '@/lib/data/groups'
import { GroupType } from '@/lib/types'

// -----------------
// getGroupColor
// -----------------
// given a group name, return its hex color
// returns a fallback gray if group not found

export function getGroupColor(groupName: string): string {
    const group = groups.find((g) => g.name === groupName)
    return group?.color ?? '#d1d5db'
    //if group exsists, then access its color property. Otherwise, return undefined
    //without it, if group is undefined (because no group matched), tyring group.color would throw an error

    //example
    //const group = undefined
    //console.log(group?.color) // undefined (safe)
    //console.log(group.color) // error: cannot read property 'color'

    //the ?. (optional chaining) says "only access ./color if group exists - otherwise return undefined safely"
    // ?? (nullish coalescing operator)
    // means: if the left side is null or undefined, use the right side instead.
}

// -----------------
// getGroupType
// -----------------
// given a group name, return its type (gg/bg/soloist)

export function getGroupType(groupName: string): GroupType | undefined {
    const group = groups.find((g) => g.name === groupName)
    return group?.type
    //without question mark, it throws an error. 'group' is possibly 'undefined'
}

// -----------------
// getGroupNames
// -----------------
// Returns just the names of all groups as a string array

export function getGroupNames(): string[] {
    return groups.map((g) => g.name)
}