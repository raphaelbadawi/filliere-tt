export default function parseLinks(text: string) {
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    return text.split(urlRegex).map((part, index) => {
        // If the part matches the URL regex, return it as an anchor tag
        if (part.match(urlRegex)) {
            return (
                <a className="hover:underline text-primary" href={part} key={index} target="_blank" rel="noopener noreferrer">
                    {part}
                </a>
            );
        }
        // Otherwise, return the part as plain text
        return part;
    });
}