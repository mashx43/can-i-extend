import { describe, expect, it } from "bun:test";
import { canIExtend } from "../src/index.ts";

describe("canIExtend", () => {
	describe("デフォルトの制限リスト", () => {
		it("通常のウェブサイトは許可されるべき", () => {
			expect(canIExtend("https://google.com")).toBe(true);
			expect(canIExtend("https://example.com/path/to/page")).toBe(true);
			expect(canIExtend("http://localhost:3000")).toBe(true);
		});

		it("chrome:// URLは制限されるべき", () => {
			expect(canIExtend("chrome://extensions")).toBe(false);
			expect(canIExtend("chrome://settings/help")).toBe(false);
		});

		it("about: URLは制限されるべき", () => {
			expect(canIExtend("about:blank")).toBe(false);
			expect(canIExtend("about:version")).toBe(false);
		});

		it("view-source: URLは制限されるべき", () => {
			expect(canIExtend("view-source:https://example.com")).toBe(false);
		});

		it("devtools: URLは制限されるべき", () => {
			expect(canIExtend("devtools://devtools/bundled/inspector.html")).toBe(
				false,
			);
		});

		it("chrome-error: URLは制限されるべき", () => {
			expect(canIExtend("chrome-error://chromewebdata/")).toBe(false);
		});

		it("chrome-extension: URLは制限されるべき", () => {
			expect(
				canIExtend("chrome-extension://abcdefghijklmnop/options.html"),
			).toBe(false);
		});

		it("Chrome Web Storeは制限されるべき", () => {
			expect(canIExtend("https://chromewebstore.google.com/")).toBe(false);
			expect(canIExtend("https://chromewebstore.google.com/detail/abc")).toBe(
				false,
			);
		});
	});

	describe("カスタム制限リスト", () => {
		it("ユーザー指定のリストを追加（結合）できるべき", () => {
			const options = { restrictedUrls: [/^https:\/\/example\.com\/.*/] };
			expect(canIExtend("https://example.com/block-me", options)).toBe(false);
			expect(canIExtend("chrome://extensions", options)).toBe(false); // デフォルトも維持される
		});

		it("特定のドメインのみを制限できるべき", () => {
			const options = { restrictedUrls: [/.*:\/\/.*\.facebook\.com\/.*/] };
			expect(canIExtend("https://www.facebook.com/profile", options)).toBe(
				false,
			);
			expect(canIExtend("https://google.com", options)).toBe(true);
		});
	});
});
