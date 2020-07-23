import React, { Fragment, useState } from 'react'

type FormElem = React.FormEvent<HTMLFormElement>

interface IFormProps {
    current: string,
    hasTasks: boolean,
    //task: Array<string>,
};

export const Form: React.FunctionComponent<IFormProps> = () => {

    const [current, setCurrent] = useState<string>('');
    const [tasks, setTasks] = useState<IFormProps[]>([]);

    const handleSubmit = (e: FormElem): void => {
        e.preventDefault();
        addTodo(current);
        setCurrent("");
    };

    const addTodo = (current: string): void => {
        const newTasks: IFormProps[] = [...tasks, { current, hasTasks: false }];
        setTasks(newTasks);
    };

    const completeTasks = (index: number): void => {
        const newTasks: IFormProps[] = tasks;
        newTasks[index].hasTasks = !newTasks[index].hasTasks;
        console.log(newTasks)
        setTasks(newTasks);
    };

    const removeTask = (index: number): void => {
        const newTasks: IFormProps[] = tasks;
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={current}
                    onChange={e => setCurrent(e.target.value)}
                    placeholder="Add a task" />
                <button type="submit">
                    Add Tasks!
                </button>
            </form>
            <section>
                {tasks.map((item: IFormProps, index: number) => (
                    <div key={index}>
                        <div
                            style={{ textDecoration: item.hasTasks ? "line-through" : "" }}>
                            {item.current}
                        </div>
                        <button type="button" onClick={() => completeTasks(index)}>
                            {item.hasTasks ? 'Incomplete task' : 'Completed task'}
                        </button>
                        <button onClick={() => removeTask(index)}>x</button>
                    </div>
                ))}
            </section>
        </Fragment>
    );
}