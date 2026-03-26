# OpenClaw Mission Control Kit

This package contains:

- research notes
- a full Mission Control specification
- a runnable Next.js skeleton
- coordinated prompts for parallel coding
- a one-time install command file

## Suggested flow

1. Extract the zip.
2. Open a terminal in the project root.
3. Run the commands in `install-once.txt`.
4. Start the skeleton with `npm run dev`.
5. Open the files in `prompts/` and run each prompt in a separate ChatGPT tab.
6. Merge the returned files into the exact matching paths.

## Folder overview

- `docs/`: research + spec
- `prompts/`: master context + 8 coordinated prompts
- `src/`: modular app skeleton plus contracts, dispatch, QA logic, and dashboard boards

## Important

This repo remains lightweight and mock-driven. Contracts, selectors, and dashboard pages are wired so Part 7 can run now and Part 8 can later swap in centralized seed files without rewriting page modules.
