export function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: 'yr', seconds: 31536000 },
        { label: 'm', seconds: 2592000 },
        { label: 'wk', seconds: 604800 },
        { label: 'dy', seconds: 86400 },
        { label: 'hr', seconds: 3600 },
        { label: 'min', seconds: 60 },
        { label: 'sec', seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}
