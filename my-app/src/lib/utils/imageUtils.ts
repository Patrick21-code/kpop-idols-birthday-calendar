
// -----------------
// getInitials
// -----------------
// given an idol's name, returns their initials for the fallback avatar.
// "Kim Jennie" => "KJ"
// "RM" -> "RM"

export function getInitials(name: string): string {
    //trim() removes extra spaces at the start/end
    //split(' ') breaks the name into words
    //"Kim Jennie" => ["Kim", "Jennie"]
    //"RM" => ["RM"]
    const parts = name.trim().split(' ')

    if (parts.length === 1) {
        //single name like "Lisa" or "RM" - returns as-is (max 2 chars)
        //slice(0, 2) takes the first two characters
        return parts[0].slice(0, 2). toUpperCase()
    }

    //take first letter of first and last word
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    //parts[0][0] => first letter of the first word
    //parts[parts.length - 1][0] => first letter of the last word
}

// -----------------
// isValidImageUrl
// -----------------
// Basic check that a string looks like a url
// used before rendering an image to avoid broken img tags

export function isValidImageUrl(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://')
}