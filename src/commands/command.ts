// @ts-ignore
// @ts-ignore
/**
 * A text-based instruction used to communicate directly with my portfolio.
 *
 * <strong>Core Commands</strong>
 * <strong>🗺️ Navigation & Location</strong>
 * <ul>
 *     <li><code>pwd</code> (Print Working Directory): Displays the exact folder path you are currently looking at.</li>
 *     <li><code>ls</code> (List): Shows all files and folders inside your current directory.</li>
 *     <li><code>cd</code> (Change Directory): Moves you into a different folder (e.g., <code>cd Documents</code>).</li>
 * </ul>
 * <strong>📂 File & Folder Management</strong>
 * <ul>
 *     <li><code>mkdir</code> (Make Directory): Creates a brand new, empty folder.</li>
 *     <li><code>touch</code> Generates a blank text file or updates file metadata.</li>
 *     <li><code>cp</code> (Copy): Duplicates a specified file or directory to another location.</li>
 *     <li><code>mv</code> (Move/Rename): Transfers a file to a new path or changes its name.</li>
 *     <li><code>rm</code> (Remove): Deletes files or folders permanently (use <code>rm -rf</code> carefully).</li>
 * </ul>
 * <strong>🔍 Inspection & Text Processing</strong>
 * <ul>
 *     <li><code>cat</code> (Concatenate): Prints the entire text content of a file straight to the screen.</li>
 *     <li>less: Opens a file interactively, allowing you to scroll up and down through long text.</li>
 *     <li>grep: Searches for specific words or text patterns inside files or output streams.</li>
 * <strong>🛡️ System Control & Help</strong>
 * <ul>
 *     <li>man (Manual): Displays the built-in system documentation and manual page for any command.</li>
 *     <li>clear: Wipes the terminal screen clean of previous text clutter.</li>
 *     <li>sudo (Superuser Do): Runs a command with administrative security privileges.</li>
 * </ul>
 */
interface Command {
    name: string;
    description: string;
    execute(command: Command): void;
}