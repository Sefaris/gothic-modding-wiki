---
title: zSpy
description: A debugging tool that displays engine operations during Gothic or Spacer runtime.
sidebar_position: 11
---

# zSpy

**zSpy** is a debugging tool that displays most of the operations performed by the engine during the running of **Gothic** or **Spacer**.

:::warning
zSpy must be started **before** Gothic or Spacer so that the program can find it.
- In **Gothic I**, this sometimes has to be done manually.
- In **Gothic II**, this is handled by `GothicStarter_mod.exe`.
:::

To follow messages in zSpy effectively, Gothic should be started in **windowed mode**.
- The corresponding option can be found in `GothicStarter_mod.exe`.
- Within Gothic, when **Marvin mode** is activated, you can toggle between windowed and full-screen mode at any time with the `F3` key.

## Log Level

With the `-zlog:` command line argument in GothicStarter, you can specify how many messages zSpy will output. The value can be a number between **-1** and **9** (e.g. `-zlog:5`).

- **-1**: Disable every message (except fatal errors).
- **0**: Shows only warnings, faults, and fatal errors.
- **1 - 9**: Display more information. Each message has a priority level.
    - If you select **1**, the program displays only messages with priority `<= 1`.
    - If you select **5**, it displays messages with priority `<= 5`.
    - If you select **9**, it displays almost everything the engine produces.

:::tip
For general debugging, the recommended value is **5**.
:::

## Output

zSpy issues its reports in the following format:

`Time Type Priority User Message ... <filename, #line>`

**Example:**
`00:21 Info:  3 B:     GOTHIC: Exiting game ... .... <oGameManager.cpp,#617>`

### Time
Time elapsed since the start of `Gothic.exe`.

### Type
Type of message. The following types are distinguished:

- **Fatal**: Critical error causing the application to close.
- **Fault**: A simple bug that will not cause the application to stop, but display or performance issues may occur.
- **Warn**: A warning of possible consequences. An error that follows soon afterwards could be related to it.
- **Info**: General information about the progress of the program.

### Priority
Priority level of the message. Messages with lower priority (higher number) can be disabled via the [Log Level](#log-level).

### User
User ID - a letter defined by every engine developer to highlight their logs:

- **D**: Dieter
- **U**: Ulf
- **B**: Bert
- **C**: Carsten
- **A**: Andre
- **X**: Kurt

### Message
The most important part. A message that contains:
- A symbol representing a program module (e.g., `MDL` = 3D models, `PAR` = Parser).
- The actual message content.

## Configuration

In zSpy, you can customize the font and its color depending on the type of message.
In addition, you can configure logging options:
- Filtering various messages (Info, Warn, Fault, Fatal).
- Auto show/hide zSpy when starting/stopping Gothic.
- Saving the log to a separate file.

## Console Commands

You can use the `zerr` command in the console (F2) to control zSpy at runtime.

### zerr level

Sets the level of logging detail.

```
zerr level <#>
```

- `<#>`: Max message priority. See [Log Level](#log-level).

### zerr searchspy

Links zSpy with Gothic. Useful if you run zSpy *after* the game is already running.

```
zerr searchspy
```

### zerr authors

Sets a filter to display only messages from one author.

```
zerr authors <letter>
```

- `<letter>`: One of the letters listed in the [User](#user) section.

### zerr rem

Includes a remark (separator line) into the log, which is useful for marking specific events during debugging.

```
zerr rem
```

**Example Output:**
```
00:46 Info:  3 B:     OPT: Blood-Details: Value=2 .... <oGameManager.cpp,#1302>
00:57 ---------------
00:57 ---------------
01:01 Info:  3 B:     GMAN: Leaving Menu-Section .... <oGameManager.cpp,#1537>
```

### zerr status

Displays the current status of zSpy in the console.

```
zerr status
```
