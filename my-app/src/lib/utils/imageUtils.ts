
// -----------------
// getInitials
// -----------------
// given an idol's name, returns their initials for the fallback avatar.
// "Kim Jennie" => "KJ"
// "RM" -> "RM"

export function getInitials(name: string): string {
    const parts = name.trim().split(' ')

    if (parts.length === 1) {
        //single name like "Lisa" or "RM" - returns as-is (max 2 chars)
        return parts[0].slice(0, 2). toUpperCase()
    }

    //take first letter of first and last word
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}