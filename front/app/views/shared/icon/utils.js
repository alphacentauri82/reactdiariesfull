const icons = [
  { id: 0, code: 'logo', icon: 'fa-optin-monster' },
  { id: 1, code: 'logout', icon: 'fa-sign-out' }
];

export function getIcon(iconSelected) {
  const icon = icons.find((current) => current.code.toUpperCase() === iconSelected.toUpperCase());
  if (icon) {
    return icon.icon;
  }
  return '';
}

export function getSize(size) {
  switch (size) {
  case 'xlarge':
    return 4;
  case 'large':
    return 3;
  case 'medium':
    return 2;
  default:
    return 1;
  }
}
