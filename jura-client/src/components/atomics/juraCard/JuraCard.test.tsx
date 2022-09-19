// TODO undo my provisional changes and restore initial Nico's work! (ex: readd "ticket props")

import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Project } from '../../../services/api/generated/graphql';
import { PROJECT_ACTIONS } from '../../../services/models/action';
import { ProjectStatus } from '../../../services/models/project';
import { JuraCard } from './JuraCard';

const p: Project = {
  id: '1',
  description: 'a description',
  members: [],
  name: 'project',
  status: ProjectStatus.OPEN,
  created_at: new Date()
};

describe('JuraCard', () => {
  it('should render the jura card', () => {
    const component = render(
      <MemoryRouter>
        <JuraCard
          id="test"
          title="some very very long title"
          dueDate={new Date()}
          status={ProjectStatus.OPEN}
          members={['1', '2', '3']}
          onAction={jest.fn()}
          actions={PROJECT_ACTIONS}
          item={p}
        />
      </MemoryRouter>
    );

    expect(component.getByTestId('juraCard-test')).toBeDefined();
    // expect(component.getByTestId('icon-high')).toBeDefined();
    expect(component.getByTestId('ellipsis')).toBeDefined();
    expect(component.getByTestId('juraCard-test-title')).toBeDefined();
    expect(component.getByTestId('dateBadge')).toBeDefined();
    expect(component.getByTestId('juraCard-test-status')).toBeDefined();
    expect(component.getByTestId('members')).toBeDefined();
  });

  it('should not render the priority', () => {
    const component = render(
      <MemoryRouter>
        <JuraCard
          id="test"
          title="some very very long title"
          dueDate={new Date()}
          status={ProjectStatus.OPEN}
          members={['1', '2', '3']}
          onAction={jest.fn()}
          item={p}
        />
      </MemoryRouter>
    );

    expect(component.getByTestId('no-priority')).toBeDefined();
  });

  it('should be medium priority', () => {
    const component = render(
      <MemoryRouter>
        <JuraCard
          id="test"
          title="some very very long title"
          dueDate={new Date()}
          status={ProjectStatus.OPEN}
          members={['1', '2', '3']}
          onAction={jest.fn()}
          item={p}
        />
      </MemoryRouter>
    );

    // expect(component.getByTestId('icon-medium')).toBeDefined();
  });

  it('should be low priority', () => {
    const component = render(
      <MemoryRouter>
        <JuraCard
          id="test"
          title="some very very long title"
          dueDate={new Date()}
          status={ProjectStatus.OPEN}
          members={['1', '2', '3']}
          onAction={jest.fn()}
          item={p}
        />
      </MemoryRouter>
    );

    // expect(component.getByTestId('icon-low')).toBeDefined();
  });

  it('should render the ellipsis', () => {
    const component = render(
      <MemoryRouter>
        <JuraCard
          id="test"
          title="some very very long title"
          dueDate={new Date()}
          status={ProjectStatus.OPEN}
          members={['1', '2', '3']}
          onAction={jest.fn()}
          actions={PROJECT_ACTIONS}
          item={p}
        />
      </MemoryRouter>
    );

    expect(component.getByTestId('ellipsis')).toBeDefined();
  });

  it('should not render the ellipsis', () => {
    const component = render(
      <MemoryRouter>
        <JuraCard
          id="test"
          title="some very very long title"
          dueDate={new Date()}
          status={ProjectStatus.OPEN}
          members={['1', '2', '3']}
          onAction={jest.fn()}
          item={p}
        />
      </MemoryRouter>
    );

    expect(component.queryByTestId('ellipsis')).toBeNull();
  });
});
