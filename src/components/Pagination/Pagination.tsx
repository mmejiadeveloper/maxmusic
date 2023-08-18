import { useState } from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  children: (paginationData: { pageIni: number; pageEnd: number }) => any;
  resultsLength: number;
}

export const Pagination = ({ children, resultsLength }: PaginationProps) => {
  const [paginationRate, setPaginationRate] = useState(5);
  const [pageIni, setPagIni] = useState(0);
  const [pageEnd, setPagEnd] = useState(paginationRate);
  const [selectedPage, setSelectedPage] = useState(1);

  return (
    <>
      {children({ pageIni, pageEnd })}
      {!resultsLength && <h3>No results found</h3>}
      {!!resultsLength && resultsLength > 5 && (
        <article className={styles.pagination}>
          <header>
            <select
              name=""
              id=""
              onChange={(e) => {
                setPaginationRate(parseInt(e.target.value));
                setPagIni(0);
                setPagEnd(parseInt(e.target.value));
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </header>
          <section>
            {Array(Math.ceil(resultsLength / paginationRate))
              .fill("justanyvaluetofill")
              .map((x, index) => {
                const currentPosition = index + 1;

                return (
                  <button
                    className={`${
                      currentPosition === selectedPage && styles.selectedPage
                    }`}
                    key={index}
                    onClick={() => {
                      setPagIni(index * paginationRate);
                      setPagEnd(currentPosition * paginationRate);
                      setSelectedPage(currentPosition);
                    }}
                  >
                    {currentPosition}
                  </button>
                );
              })}
          </section>
        </article>
      )}
    </>
  );
};
