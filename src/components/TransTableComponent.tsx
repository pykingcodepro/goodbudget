import transactionsData from "@/typeDefiniton/transactionsData";

export default function TransTableComponent(
    { transactionsList }: { transactionsList: transactionsData[] | null }
) {

    const transListElement = transactionsList?.map((trans: transactionsData, key: number) => {
        return (
            <tr key={key}>
                <td>{trans.party}</td>
                <td style={{ color: trans.c_type == "income" ? "green" : "red", fontWeight: "bold" }}>{trans.amount}</td>
                <td>{trans.c_name}</td>
                <td>{trans.date}</td>
                <td>{trans.mode}</td>
                <td>{trans.desc}</td>
            </tr>
        );
    })

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Party</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Mode</th>
                        <th>Description</th>
                    </tr>
                </thead>
                {
                    transactionsList 
                    ? <tbody>{transListElement}</tbody>
                    : null
                }
            </table>
            { transactionsList ? null : <b className="text-danger">No Data</b> }
        </>
    );
}