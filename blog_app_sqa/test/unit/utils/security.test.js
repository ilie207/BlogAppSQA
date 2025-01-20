import validator from "validator";

describe("Input Sanitization Tests", () => {
  const testInputs = {
    sqlInjection: {
      input: "SELECT * FROM users; DROP TABLE users;--",
      description: "SQL Injection attempt",
    },
    xssAttack: {
      input: "<script>alert('xss')</script>",
      description: "XSS attack attempt",
    },
    maliciousUrl: {
      input: "javascript:alert('malicious')",
      description: "Malicious URL injection",
    },
    normalText: {
      input: "Hello World",
      description: "Regular text input",
    },
    complexSqlInjection: {
      input: "'; UPDATE users SET admin=true WHERE email LIKE '%';--",
      description: "Complex SQL injection attempt",
    },
    htmlTags: {
      input: "<h1>Title</h1><iframe src='malicious.com'></iframe>",
      description: "Malicious HTML tags",
    },
  };

  test.each(Object.entries(testInputs))(
    "Sanitizes %s correctly",
    (key, { input, description }) => {
      const sanitized = validator.escape(input);

      expect(sanitized).not.toContain("<script>");
      expect(sanitized).not.toContain("</script>");

      expect(typeof sanitized).toBe("string");
      expect(sanitized.length).toBeGreaterThan(0);

      console.log(`Test: ${description}`);
      console.log(`Original: ${input}`);
      console.log(`Sanitized: ${sanitized}`);
      console.log("---");
    }
  );

  test("Validates email addresses", () => {
    const emails = {
      valid: "user@example.com",
      invalid: "not-an-email",
      sqlInjection: "user@example.com'; DROP TABLE users;--",
    };

    expect(validator.isEmail(emails.valid)).toBe(true);
    expect(validator.isEmail(emails.invalid)).toBe(false);
    expect(validator.isEmail(emails.sqlInjection)).toBe(false);
  });

  test("Validates URL safety", () => {
    const urls = {
      safe: "https://example.com",
      javascript: "javascript:alert(1)",
      dataUrl: "data:text/html,<script>alert(1)</script>",
    };

    expect(validator.isURL(urls.safe)).toBe(true);
    expect(validator.isURL(urls.javascript)).toBe(false);
    expect(validator.isURL(urls.dataUrl)).toBe(false);
  });
});
