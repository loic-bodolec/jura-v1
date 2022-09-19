import { ApolloServer, gql } from 'apollo-server';
import createServer from '../../../app/server';
import Ticket from '../../../dataLayer/entities/Ticket';
import { ProjectService } from '../../../domain/services/project/ProjectService';
import { newProjectMock } from '../../../test/mock/project/projectMock';

let server: ApolloServer;

beforeAll(async () => {
  server = await createServer();
});

describe('Ticket resolver', () => {
  it('adds a new ticket to database', async () => {
    const projectService = new ProjectService();
    const newProject = await projectService.create(newProjectMock, [], '');

    const createTicketMutation = gql`
      mutation CreateTicket(
        $ticket: CreateTicketInput!
        $projectId: String!
        $membersIds: [String!]!
      ) {
        createTicket(ticket: $ticket, projectId: $projectId, membersIds: $membersIds) {
          id
          status
          priority
        }
      }
    `;

    const variables = {
      ticket: {
        priority: 'Red',
        status: 'In Progress',
        title: 'ticket 1',
        due_date: '2022-03-22 10:20:02.402731',
        estimated_time: 2,
        description: 'description',
      },
      projectId: newProject.id.toString(),
      membersIds: [],
    };

    const res = await server.executeOperation({
      query: createTicketMutation,
      variables,
    });

    const TicketFromResponse = res.data?.createTicket;

    expect(res.data?.createTicket).toEqual(
      expect.objectContaining({
        priority: 'Red',
        status: 'In Progress',
        id: res.data?.createTicket.id,
      }),
    );
    const TicketInDb = await Ticket.findOne(TicketFromResponse.id);

    expect(TicketInDb?.status).toBe(TicketFromResponse.status);
  });
});
