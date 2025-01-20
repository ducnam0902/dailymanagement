import React from "react";

interface IHeadingTitle {
  title: string;
}

const HeadingTitle = ({ title }: IHeadingTitle) => {
  return (
    <section className="my-6 text-3xl font-bold">
      <h3 className="border-l-8 border-secondary pl-4">{title}</h3>
    </section>
  );
};

export default HeadingTitle;
