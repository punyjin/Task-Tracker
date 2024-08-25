export function createTable() {
    return `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Task 1</td>
                    <td>Completed</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Task 2</td>
                    <td>Pending</td>
                </tr>
            </tbody>
        </table>
    `;
}
