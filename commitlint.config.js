/**
 * commitlint-jira: https://github.com/Gherciu/commitlint-jira
 *
 * rules:
 *  1. jira-task-id-empty - this rule check if commit message task id is not empty.
 *    If your task do not have an id use a conventional task id e.g: IB-0000
 *    a. ❌ Bad commit messages
 *      - git commit -m "My commit message body"
 *      - git commit -m ":My commit message body"
 *    b. ✅ Good commit messages
 *      - git commit -m "IB-2121, IB-21: My commit message body"
 *      - git commit -m"IB-0000: My commit message body"
 *
 *  2. jira-task-id-max-length - this rule check if jira task id length is loonger that the provided value.
 *    Preconfigured and recommended value in commitlint-config-jira is 9 chars
 *    a. ❌ Bad commit messages
 *      - git commit -m "IB-2121212121212121: My commit message body"
 *    b. ✅ Good commit messages
 *      - git commit -m"IB-2121: My commit message body"
 *      - git commit -m"IB-21: My commit message body"
 *
 *  3. jira-task-id-min-length - this rule check if jira task id length is shorter that the provided value.
 *    Preconfigured and recommended value in commitlint-config-jira is 3 chars
 *    a. ❌ Bad commit messages
 *      - git commit -m"I1: My commit message body"
 *    b. ✅ Good commit messages
 *      - git commit -m"IB-2121: My commit message body"
 *
 *  4. jira-task-id-case - this rule check if taskId is in provided case.
 *    Preconfigured and recommended value in commitlint-config-jira is "uppercase"
 *    a. ❌ Bad commit messages
 *      - git commit -m"ib-21: My commit message body"
 *    b. ✅ Good commit messages
 *      - git commit -m "IB-2121, IB-21: My commit message body"
 *      - git commit -m "IB-21: My commit message body"
 *
 *  5. jira-task-id-separator - this rule check if taskId header and footer is separated with provided value.
 *    Preconfigured and recommended value in commitlint-config-jira is "-"
 *    a. ❌ Bad commit messages
 *      - git commit -m"IB/21: My commit message body"
 *      - git commit -m"IB_21 :My commit message body"
 *    b. ✅ Good commit messages
 *      - git commit -m "IB-2121, IB-21: My commit message body"
 *      - git commit -m "IB-21: My commit message body"
 *
 * 6. jira-task-id-project-key - this rule check if commit message task id starts with specific project key.
 *    Accept a string or an array of strings, by default is disabled. For exmample ["PRJ1", "PRJ2"].
 *    a. ❌ Bad commit messages
 *      - git commit -m "IB-21: My commit message body"
 *    b. ✅ Good commit messages
 *      - git commit -m "PRJ1-21, PRJ1-22: My commit message body"
 *      - git commit -m "PRJ2-21: My commit message body"
 *
 * 7. jira-commit-status-case - this rule check if commit status is in provided case.
 *    Preconfigured and recomended value in commitlint-config-jira is "uppercase"
 *    a. ❌ Bad commit messages
 *      - git commit -m "[wip]IB-21: My commit message body"
 *    b. ✅ Good commit messages
 *      - git commit -m "[WIP]IB-21: My commit message body"
 *
 *  8. jira-commit-message-separator - this rule check if commit message separator match provided separator.
 *    Preconfigured and recomended value in commitlint-config-jira is ":"
 *    a. ❌ Bad commit messages
 *      - git commit -m "IB-21/ My commit message body"
 *      - git commit -m "IB-21 - My commit message body"
 *      - git commit -m "IB-21% My commit message body"
 *    b. ✅ Good commit messages
 *      - git commit -m "IB-21: My commit message body"
 */

module.exports = {
  plugins: ['commitlint-plugin-jira-rules'],
  extends: ['jira'],
  /*
   * Any rules defined here will override rules from `commitlint-plugin-jira-rules`
   * Format example: https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
   */
  rules: {
    'jira-task-id-project-key': [2, 'always', ['ADMIN', 'QPP']],
    'jira-commit-message-separator': [2, 'always', ': '],
    'jira-task-id-max-length': [0]
  }
};
