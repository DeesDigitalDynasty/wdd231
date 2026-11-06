document.addEventListener('DOMContentLoaded', () => {
    // Populate Copyright Year
    const yearSpan = document.querySelector('#currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Populate Last Modified Date
    const lastModifiedParagraph = document.querySelector('#lastModified');
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
    }
});