import type { PostBlock, PostSection, PostSubsection } from "../content/posts";

function BlockList({ blocks }: { blocks: PostBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return <p key={`p-${index}`}>{block.text}</p>;
        }
        if (block.type === "ul") {
          return (
            <ul key={`ul-${index}`}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={`ol-${index}`}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          );
        }
        return (
          <div key={`table-${index}`} className="my-12 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-[14px] leading-[1.45]">
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th
                      key={header}
                      className="border-b border-black/15 px-0 py-2 pr-6 font-medium text-black"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={row.join("|") + rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${cellIndex}-${cell}`}
                        className="border-b border-black/10 px-0 py-2.5 pr-6 align-top text-black/80"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

function SubsectionBody({ subsection }: { subsection: PostSubsection }) {
  return (
    <>
      <h3>{subsection.heading}</h3>
      {subsection.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {subsection.blocks ? <BlockList blocks={subsection.blocks} /> : null}
    </>
  );
}

export default function ArticleSection({ section }: { section: PostSection }) {
  const hideHeading = section.heading === "Overview";
  return (
    <section>
      {hideHeading ? null : <h2>{section.heading}</h2>}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.blocks ? <BlockList blocks={section.blocks} /> : null}
      {section.subsections?.map((subsection) => (
        <SubsectionBody key={subsection.heading} subsection={subsection} />
      ))}
    </section>
  );
}
