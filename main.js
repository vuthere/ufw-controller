const { exec } = require('child_process');
const fs = require('fs');

class UFWController {
  /**
   * Executes a terminal command.
   * @param {string} command - The command to execute.
   * @returns {Promise<string>} - The output of the command.
   */
  async runCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${stderr}`);
        } else {
          resolve(stdout.trim());
        }
      });
    });
  }

  /**
   * Gets the status of UFW.
   * @returns {Promise<string>} - The status of UFW.
   * @example
   * const status = await ufw.status();
   * console.log(status);
   */
  async status() {
    const command = 'sudo ufw status';
    return await this.runCommand(command);
  }

  /**
   * Checks if a specific rule exists.
   * @param {string} rule - The rule to check.
   * @returns {Promise<boolean>} - True if the rule exists, false otherwise.
   * @example
   * const exists = await ufw.ruleExists('80/tcp');
   * console.log(exists);
   */
  async ruleExists(rule) {
    const status = await this.status();
    return status.includes(rule);
  }

  /**
   * Adds an "allow" rule for a specific port or service.
   * @param {string|number} portOrService - The port number or service name (e.g., '80', 'ssh').
   * @param {string} [protocol=''] - Optional. The protocol (tcp/udp). Defaults to both.
   * @returns {Promise<object>} - JSON with the status of the operation (success/skipped).
   * @example
   * const result = await ufw.allow(80, 'tcp');
   * console.log(result);
   */
  async allow(portOrService, protocol = '') {
    const rule = `${portOrService}${protocol ? '/' + protocol : ''}`;
    if (!(await this.ruleExists(rule))) {
      const command = `sudo ufw allow ${rule}`;
      const result = await this.runCommand(command);
      return { status: 'success', rule, action: 'allow', message: result };
    } else {
      return { status: 'skipped', rule, action: 'allow', message: `Rule '${rule}' already exists.` };
    }
  }

  /**
   * Adds a "deny" rule for a specific port or service.
   * @param {string|number} portOrService - The port number or service name (e.g., '80', 'ssh').
   * @param {string} [protocol=''] - Optional. The protocol (tcp/udp). Defaults to both.
   * @returns {Promise<object>} - JSON with the status of the operation (success/skipped).
   * @example
   * const result = await ufw.deny(22, 'tcp');
   * console.log(result);
   */
  async deny(portOrService, protocol = '') {
    const rule = `${portOrService}${protocol ? '/' + protocol : ''}`;
    if (!(await this.ruleExists(rule))) {
      const command = `sudo ufw deny ${rule}`;
      const result = await this.runCommand(command);
      return { status: 'success', rule, action: 'deny', message: result };
    } else {
      return { status: 'skipped', rule, action: 'deny', message: `Rule '${rule}' already exists.` };
    }
  }

  /**
   * Allows connections from a specific IP address with optional port and protocol.
   * @param {string} ip - The IP address to allow.
   * @param {string} [port=''] - Optional. The port to allow.
   * @param {string} [protocol=''] - Optional. The protocol (tcp/udp).
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.allowFromIp('192.168.1.100', '8080', 'tcp');
   * console.log(result);
   */
  async allowFromIp(ip, port = '', protocol = '') {
    const rule = `from ${ip}${port ? ' to any port ' + port : ''}${protocol ? ' proto ' + protocol : ''}`;
    if (!(await this.ruleExists(rule))) {
      const command = `sudo ufw allow ${rule}`;
      const result = await this.runCommand(command);
      return { status: 'success', rule, action: 'allow', message: result };
    } else {
      return { status: 'skipped', rule, action: 'allow', message: `Rule '${rule}' already exists.` };
    }
  }

  /**
   * Denies connections from a specific IP address with optional port and protocol.
   * @param {string} ip - The IP address to deny.
   * @param {string} [port=''] - Optional. The port to deny.
   * @param {string} [protocol=''] - Optional. The protocol (tcp/udp).
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.denyFromIp('192.168.1.100', '8080', 'tcp');
   * console.log(result);
   */
  async denyFromIp(ip, port = '', protocol = '') {
    const rule = `from ${ip}${port ? ' to any port ' + port : ''}${protocol ? ' proto ' + protocol : ''}`;
    if (!(await this.ruleExists(rule))) {
      const command = `sudo ufw deny ${rule}`;
      const result = await this.runCommand(command);
      return { status: 'success', rule, action: 'deny', message: result };
    } else {
      return { status: 'skipped', rule, action: 'deny', message: `Rule '${rule}' already exists.` };
    }
  }

  /**
   * Enables UFW.
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.enable();
   * console.log(result);
   */
  async enable() {
    const command = 'sudo ufw enable';
    const result = await this.runCommand(command);
    return { status: 'success', action: 'enable', message: result };
  }

  /**
   * Disables UFW.
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.disable();
   * console.log(result);
   */
  async disable() {
    const command = 'sudo ufw disable';
    const result = await this.runCommand(command);
    return { status: 'success', action: 'disable', message: result };
  }

  /**
   * Reloads UFW rules.
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.reload();
   * console.log(result);
   */
  async reload() {
    const command = 'sudo ufw reload';
    const result = await this.runCommand(command);
    return { status: 'success', action: 'reload', message: result };
  }

  /**
   * Lists all current UFW rules.
   * @returns {Promise<string>} - JSON with the list of rules.
   * @example
   * const rules = await ufw.listRules();
   * console.log(rules);
   */
  async listRules() {
    const command = 'sudo ufw status numbered';
    return await this.runCommand(command);
  }

  /**
   * Resets UFW to its default state, deleting all rules.
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.reset();
   * console.log(result);
   */
  async reset() {
    const command = 'sudo ufw reset';
    const result = await this.runCommand(command);
    return { status: 'success', action: 'reset', message: result };
  }

  /**
   * Enables logging for UFW.
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.logging();
   * console.log(result);
   */
  async logging() {
    const command = 'sudo ufw logging on';
    const result = await this.runCommand(command);
    return { status: 'success', action: 'logging', message: result };
  }

  /**
   * Rejects connections instead of denying them.
   * @param {string|number} portOrService - The port number or service name (e.g., '80', 'ssh').
   * @param {string} [protocol=''] - Optional. The protocol (tcp/udp).
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.reject(22, 'tcp');
   * console.log(result);
   */
  async reject(portOrService, protocol = '') {
    const rule = `${portOrService}${protocol ? '/' + protocol : ''}`;
    if (!(await this.ruleExists(rule))) {
      const command = `sudo ufw reject ${rule}`;
      const result = await this.runCommand(command);
      return { status: 'success', rule, action: 'reject', message: result };
    } else {
      return { status: 'skipped', rule, action: 'reject', message: `Rule '${rule}' already exists.` };
    }
  }

  /**
   * Checks if UFW is enabled.
   * @returns {Promise<boolean>} - True if UFW is enabled, false otherwise.
   * @example
   * const isEnabled = await ufw.isEnabled();
   * console.log(isEnabled);
   */
  async isEnabled() {
    const status = await this.status();
    return status.includes('active');
  }

  /**
   * Backs up UFW rules to a specified file.
   * @param {string} filePath - The path where the backup will be saved.
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.backup('backup.rules');
   * console.log(result);
   */
  async backup(filePath) {
    const command = `sudo ufw status > ${filePath}`;
    const result = await this.runCommand(command);
    return { status: 'success', action: 'backup', message: `Backup saved to ${filePath}.` };
  }

  /**
   * Restores UFW rules from a specified backup file.
   * @param {string} filePath - The path to the backup file.
   * @returns {Promise<object>} - JSON with the status of the operation.
   * @example
   * const result = await ufw.restore('backup.rules');
   * console.log(result);
   */
  async restore(filePath) {
    const command = `sudo ufw reset && sudo ufw allow from any`;
    await this.runCommand(command);
    const backupRules = fs.readFileSync(filePath, 'utf-8').split('\n');
    for (const rule of backupRules) {
      if (rule.trim()) {
        await this.runCommand(`sudo ufw ${rule.trim()}`);
      }
    }
    return { status: 'success', action: 'restore', message: `Restored from ${filePath}.` };
  }
}

module.exports = UFWController;
