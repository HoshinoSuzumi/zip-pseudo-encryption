import { CheckResult } from ".";

// the header of a zip file
export const TAG_FILE_HEADER = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);
// the footer of a zip file
export const TAG_FILE_FOOTER = new Uint8Array([0x50, 0x4b, 0x05, 0x06]);
// the start of a content block
export const TAG_CONTENT_BLOCK = new Uint8Array([0x50, 0x4b, 0x01, 0x02]);

export const FLAG_TRUE = new Uint8Array([0x09, 0x00]);
export const FLAG_NONE = new Uint8Array([0x00, 0x00]);

const searchSubarray = (
  buffer: Uint8Array,
  subarray: Uint8Array,
  start = 0
) => {
  let i = start;
  let j = 0;
  while (i < buffer.length) {
    if (buffer[i] === subarray[j]) {
      j++;
      if (j === subarray.length) {
        return i - j + 1;
      }
    } else {
      j = 0;
    }
    i++;
  }
  return -1;
};

const searchSubarrayAll = (
  buffer: Uint8Array,
  subarray: Uint8Array,
  start = 0
) => {
  let i = start;
  let j = 0;
  const result = [];
  while (i < buffer.length) {
    if (buffer[i] === subarray[j]) {
      j++;
      if (j === subarray.length) {
        result.push(i - j + 1);
        j = 0;
      }
    } else {
      j = 0;
    }
    i++;
  }
  return result;
};

const check_zip = (file: File) =>
  new Promise<CheckResult>(async (resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const buffer = new Uint8Array(arrayBuffer);

      const headerIndex = searchSubarray(buffer, TAG_FILE_HEADER);
      if (headerIndex === -1) {
        return resolve("broken");
      }
      const isZipEncrypted = buffer
        .slice(headerIndex + 6, headerIndex + 8)
        .every((v, i) => v === FLAG_TRUE[i]);

      const blockIndexs = searchSubarrayAll(buffer, TAG_CONTENT_BLOCK);
      let hasEncryptedBlock = false;
      for (const blockIndex of blockIndexs) {
        if (
          buffer
            .slice(blockIndex + 8, blockIndex + 10)
            .every((v, i) => v === FLAG_TRUE[i])
        ) {
          hasEncryptedBlock = true;
          break;
        }
      }
      if (isZipEncrypted && hasEncryptedBlock) {
        return resolve("encrypted");
      } else if (!isZipEncrypted && hasEncryptedBlock) {
        return resolve("pseudo");
      } else if (!isZipEncrypted && !hasEncryptedBlock) {
        return resolve("normal");
      } else {
        return resolve("unknown");
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

export { check_zip };
