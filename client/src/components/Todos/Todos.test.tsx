import React from 'react';
import { render, screen } from '@testing-library/react';
import Todos from './Todos';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';

const link = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
        reconnect: true
    }
})

const client = new ApolloClient({
    link,
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
});

const mockedData = {
    id: 'uas08asd969-9a7s6dasd-8as6dasd',
    title: 'First Todo',
    admin: {
        email: 'admin@admin.com'
    },
    members: [
        {
            email: 'admin@admin.com'
        },
        {
            email: 'notadmin@notadmin.com'
        }
    ],
    todos: [
        {
            id: '1',
            listId: 'uas08asd969-9a7s6dasd-8as6dasd',
            title: 'First Todo',
            completed: false
        },
        {
            id: '2',
            listId: 'uas08asd969-9a7s6dbsd-8as6dasd',
            title: 'Second Todo',
            completed: true
        },
        {
            id: '3',
            listId: 'uas08kud969-9a7s6dasd-8as6dasd',
            title: 'Third Todo',
            completed: false
        }
    ]
}
describe('Renders Todos correctly', () => {
    test('Displays a message if list is empty', () => {
        render(
            <ApolloProvider client={client}>
                <Todos todos={[]}/>
            </ApolloProvider>
        );
        expect(screen.getByText('Please add what needs to be done above'));
    });

    test('Renders a P-tag for each todo with title and has a className of completed if todo is completed', () => {
        render(
            <ApolloProvider client={client}>
                <Todos todos={mockedData.todos}/>
            </ApolloProvider>
        );

        mockedData.todos.forEach(todo => {
            const currentTitle = screen.getByText(todo.title);
            expect(currentTitle.tagName).toBe('P');

        
            if (todo.completed) {
                expect(currentTitle.className)
                    .toContain('completed');
            }
        });
    });

    test('Todos render one li for each item', () => {
        render(
            <ApolloProvider client={client}>
                <Todos todos={mockedData.todos}/>
            </ApolloProvider>
        )

        const allListItems = screen.getAllByRole('listitem');
        expect(allListItems.length).toEqual(mockedData.todos.length);
    })

    test('Display the correct amount as completed', () => {
        render(
            <ApolloProvider client={client}>
                <Todos todos={mockedData.todos}/>
            </ApolloProvider>
        )

        expect(screen.getByText('1 out of 3 completed'));
    })
});