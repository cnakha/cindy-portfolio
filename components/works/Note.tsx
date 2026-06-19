"use client";

type NoteProps = {
title: string;
  text: string;
};

export default function Note({ text, title }: NoteProps) {
    return (
        <div className="flex flex-col gap-2 bg-light-gray rounded-xl p-6 border border-mid-gray mx-4 lg:mx-10">
            <h3 className="text-caption font-semibold">{title}</h3>
            <p className="text-caption opacity-60">{text}</p>
        </div>
    );
}