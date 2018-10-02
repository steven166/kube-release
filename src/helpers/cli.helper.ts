/**
 * Print console table
 * @param headers
 * @param list
 * @param tabSize
 */
export function printTable(headers: string[], list: any[], tabSize = 3) {
  let tab = "";
  for (let i = 0; i < tabSize; i++) {
    tab += " ";
  }

  let columnSizes = headers.map(header => {
    let size = header.length;
    list.forEach(item => {
      let value = item[header];
      if(value instanceof Date){
        value = formatRelativeDate(value);
      }
      if (value.length > size) {
        size = value.length;
      }
    });
    return size;
  });

  // print header
  let headerColumns = [];
  for (let i = 0; i < headers.length; i++) {
    let column = headers[i].toUpperCase();
    while (column.length < columnSizes[i]) {
      column += " ";
    }
    headerColumns.push(column);
  }
  console.info(headerColumns.join(tab));

  // print header
  list.forEach(item => {
    let valueColumns = [];
    for (let i = 0; i < headers.length; i++) {
      let header = headers[i];
      let value = item[header];
      if (value instanceof Date) {
        value = formatRelativeDate(value);
      }
      let column = value + "";
      while (column.length < columnSizes[i]) {
        column += " ";
      }
      valueColumns.push(column);
    }
    console.info(valueColumns.join(tab));
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 2048) {
    return `${bytes}B`;
  } else if (bytes < 2097152) {
    return `${Math.round(bytes / 1014)}KB`;
  } else if (bytes < 2147483648) {
    return `${Math.round(bytes / 1048576)}NB`;
  } else {
    return `${Math.round(bytes / 1073741824)}GB`;
  }
}

export function formatDuraton(diff: number): string {
  if (diff < 120000) {
    return `${Math.round(diff / 1000)}s`;
  } else if (diff < 7200000) {
    return `${Math.round(diff / 60000)}m`;
  } else if (diff < 172800000) {
    return `${Math.round(diff / 3600000)}h`;
  } else {
    return `${Math.round(diff / 86400000)}d`;
  }
}

export function formatRelativeDate(date: Date): string {
  let now = Date.now();
  let time = date.getTime();
  let diff = now - time;
  if (diff < 10000) {
    return "A moment ago";
  } else if (diff < 120000) {
    return `${Math.round(diff / 1000)}s`;
  } else if (diff < 7200000) {
    return `${Math.round(diff / 60000)}m`;
  } else if (diff < 172800000) {
    return `${Math.round(diff / 3600000)}h`;
  } else {
    return `${Math.round(diff / 86400000)}d`;
  }
}
