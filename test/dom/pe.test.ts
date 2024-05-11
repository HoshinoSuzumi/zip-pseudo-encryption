import { describe, it, expect } from "vitest";
import {
  detectZipPseudoEncryption,
  generateZipPseudoEncryption,
} from "../../src";
import fs from "fs";
import { log } from "console";

describe("pseudo_encryption", () => {
  it("should be encrypted", () => {
    const encryptedZip = new File(
      [fs.readFileSync("test/files/encrypt.zip")],
      "encrypted.zip",
      { type: "application/zip" }
    );
    detectZipPseudoEncryption(encryptedZip).then((res) =>
      expect(res).toBe("encrypted")
    );
  });

  it("should be normal", () => {
    const normalZip = new File(
      [fs.readFileSync("test/files/normal.zip")],
      "normal.zip",
      { type: "application/zip" }
    );
    detectZipPseudoEncryption(normalZip).then((res) =>
      expect(res).toBe("normal")
    );
  });

  it("should be pseudo encryption", () => {
    const pseudoZip = new File(
      [fs.readFileSync("test/files/pseudo.zip")],
      "encrypted.zip",
      { type: "application/zip" }
    );
    detectZipPseudoEncryption(pseudoZip).then((res) =>
      expect(res).toBe("pseudo")
    );
  });

  it("should generate pseudo encryption", () => {
    const normalZip = new File(
      [fs.readFileSync("test/files/normal.zip")],
      "normal.zip",
      { type: "application/zip" }
    );
    const pseudoZip = new File(
      [fs.readFileSync("test/files/pseudo.zip")],
      "normal.zip",
      { type: "application/zip" }
    );
    generateZipPseudoEncryption(normalZip)
      .then(async (res) => {
        expect(res).toBeInstanceOf(File);
      })
      .catch((err) => {
        log(err);
      });
  });
});
