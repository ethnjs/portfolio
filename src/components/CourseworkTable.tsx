export default function CourseworkTable() {
  const courses = [
    { name: "Math 2H", grade: "A", score: "N/A" },
    { name: "Math 3H", grade: "A", score: "N/A" },
    { name: "AP Calculus AB", grade: "A", score: "5" },
    { name: "AP Calculus BC", grade: "A", score: "5" },
    { name: "AP Physics 1", grade: "A", score: "5" },
    { name: "AP Physics 2", grade: "A+", score: "5" },
    { name: "AP Physics C: Mechanics", grade: "N/A", score: "4" },
    { name: "AP Physics C: Electricity and Magnetism", grade: "N/A", score: "5" },
    { name: "AP Chemistry", grade: "A", score: "5" },
    { name: "AP Computer Science Principles", grade: "A+", score: "5" },
    { name: "AP Computer Science A", grade: "A+", score: "5" },
    { name: "iOS App Dev Honors", grade: "A+", score: "N/A" },
  ];

  return (
    <div className="mt-8 pt-4">
      <h4 className="font-bold text-[1.2rem] text-white border-b border-[var(--border)] pb-2 mb-4">
        notable coursework
      </h4>
      <table className="w-full border-collapse mt-6">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-[var(--text-muted)] font-bold text-[0.8rem] pb-4 uppercase text-left w-[60%]">
                Course
              </th>
              <th className="text-[var(--text-muted)] font-bold text-[0.8rem] pb-4 uppercase text-center">
                Grade
              </th>
              <th className="text-[var(--text-muted)] font-bold text-[0.8rem] pb-4 uppercase text-center">
                AP Score
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr
                key={idx}
                className="border-b border-dotted border-[var(--border-subtle)] last:border-none hover:bg-[var(--surface)] transition-colors duration-300"
              >
                <td className="py-4 px-2 text-[var(--text-secondary)]">{course.name}</td>
                <td className={`py-4 px-2 text-center font-bold ${course.grade === "N/A" ? "text-[var(--text-muted)] italic" : "text-white"}`}>
                  {course.grade}
                </td>
                <td className={`py-4 px-2 text-center font-bold ${course.score === "N/A" ? "text-[var(--text-muted)] italic" : "text-white"}`}>
                  {course.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}