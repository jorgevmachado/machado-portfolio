import type { FormatPathParams } from './interface';

export function formatPath({
  childPath,
  parentPath,
  grandParentPath,
}: FormatPathParams) {
    const formatParentPath = validatePath(parentPath);
    const formatChildPath = validatePath(childPath);
    if (!grandParentPath) {
        return `${formatParentPath}${formatChildPath}`;
    }
    const formatGrandParentPath = validatePath(grandParentPath);
    return `${formatGrandParentPath}${formatParentPath}${formatChildPath}`;
}

function validatePath(path: string) {
    if (!path.startsWith('/')) {
        return `/${path}`;
    }
    return path;
}