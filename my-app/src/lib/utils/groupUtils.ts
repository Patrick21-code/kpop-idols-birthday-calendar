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

    // ?? (nullish coalescing operator)
    // means: if the left side is null or undefined, use the right side instead.
}

