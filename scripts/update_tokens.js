const fs = require('fs');
const files = [
    'app/(publico)/(home)/show/[id].tsx',
    'app/(publico)/(home)/index.tsx',
    'app/(publico)/search.tsx',
    'src/components/publico/SearchBar.tsx',
    'src/components/publico/CategoryFilter.tsx',
    'src/components/publico/ShowCard.tsx',
    'src/components/publico/ShowCarousel.tsx'
];

const colors = [
    'circusRed', 'sunshineYellow', 'royalBlue', 'darkNavy',
    'white', 'gray100', 'gray200', 'gray300', 'gray400',
    'gray500', 'gray600', 'gray700', 'gray800', 'gray900'
];

for (const file of files) {
    if (!fs.existsSync(file)) {
        console.log(`File not found: ${file}`);
        continue;
    }
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    for (const color of colors) {
        // Replace exact matches like "$circusRed" but not if it's already "$color.circusRed"
        content = content.replace(new RegExp(`"\\$${color}"`, 'g'), `"$color.${color}"`);
        // Replace fill="$circusRed"
        content = content.replace(new RegExp(`fill="\\$${color}"`, 'g'), `fill="$color.${color}"`);
    }

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`No changes needed in ${file}`);
    }
}
