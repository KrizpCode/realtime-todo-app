import React from 'react';
import { render, screen } from '@testing-library/react';
import Members from './Members';
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
    admin: {
        email: 'admin@admin.com'
    },
    members: [
        {
            email: 'admin@admin.com'
        },
        {
            email: 'first@member.com'
        },
        {
            email: 'second@member.com'
        },
        {
            email: 'third@member.com'
        },
    ]
}

describe('Renders Members correctly', () => {
    test('Renders an H4 for each member with email', () => {
        render(
            <ApolloProvider client={client}>
                <Members
                    admin={mockedData.admin}
                    members={mockedData.members}
                />
            </ApolloProvider>
        );

        mockedData.members.forEach(member => {
            const currentTitle = screen.getByText(member.email);
            expect(currentTitle.tagName).toBe('H4');
        });
    });

    test('members render one li for each member', () => {
        render(
            <ApolloProvider client={client}>
                <Members
                    admin={mockedData.admin}
                    members={mockedData.members}
                />
            </ApolloProvider>
        )

        const allListItems = screen.getAllByRole('listitem');
        expect(allListItems.length).toEqual(mockedData.members.length);
    })
});