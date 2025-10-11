import categoryData from "@/typeDefiniton/categoryData";

export default function CategoryTableComponent(
    { categoryList }: { categoryList: categoryData[]|null }
) {

    const categoryListEl = categoryList?.map((cat: categoryData, key: number)    => {
        return (
            <tr key={key}>
                <td>{cat.c_name}</td>
                <td>{cat.c_type}</td>
            </tr>
        )
    })

  return (
    <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Category Type</th>
                </tr>
            </thead>
            {
                categoryList 
                ? <tbody>{categoryListEl}</tbody>
                : null
            }
        </table>
        {
            categoryList 
            ? null
            : <p style={{ color: "Red", fontWeight: "bold" }}>No Data</p>
        }
    </>
  )
}
