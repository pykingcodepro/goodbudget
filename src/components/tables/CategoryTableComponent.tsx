import categoryData from "@/typeDefiniton/categoryData";

export default function CategoryTableComponent({
  categoryList,
}: {
  categoryList: categoryData[] | null;
}) {
  const categoryListEl = categoryList?.map((cat: categoryData, key: number) => {
    return (
      <tr key={key}>
        <td>{cat.c_name}</td>
        <td
          style={{
            color: cat.c_type === "income" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {cat.c_type}
        </td>
        <td>{cat.createdAt}</td>
      </tr>
    );
  });

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Category Type</th>
            <th>Created At</th>
          </tr>
        </thead>
        {categoryList && categoryList.length > 0 ? (
          <tbody>{categoryListEl}</tbody>
        ) : null}
      </table>
      {categoryList && categoryList.length > 0 ? null : (
        <p style={{ color: "Red", fontWeight: "bold" }}>No Data</p>
      )}
    </>
  );
}
