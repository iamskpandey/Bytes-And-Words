function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ').replace(/(\d{2} \w{3})/, '$1,');
}

export { formatDate };