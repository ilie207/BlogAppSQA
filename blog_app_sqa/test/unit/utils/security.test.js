import validator from "validator";

const testInputs = {
  sqlInjection: "SELECT * FROM users; DROP TABLE users;--",
  xssAttack: "<script>alert('xss')</script>",
  maliciousUrl: "javascript:alert('malicious')",
  normalText: "Hello World",
};

// Test sanitization
Object.entries(testInputs).forEach(([key, value]) => {
  const sanitized = validator.escape(value);
  console.log(`Testing ${key}:`);
  console.log(`Original: ${value}`);
  console.log(`Sanitized: ${sanitized}`);
  console.log("---");
});
