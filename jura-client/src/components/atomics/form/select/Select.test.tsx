import { fireEvent, render } from '@testing-library/react';
import { Select } from './Select';

describe('Select', () => {
  it('should map over options', () => {
    const selectOption = jest.fn();
    const component = render(
      <Select
        parentId="someId"
        label="test"
        defaultOption="default value"
        options={[
          { label: 'label 1', value: 'value1' },
          { label: 'label 2', value: 'value2' },
          { label: 'label 3', value: 'value3' }
        ]}
        selectOption={selectOption}
      />
    );

    expect(component.getAllByTestId(/someId-select-option-[^]/)).toHaveLength(3);
  });

  it('should render the label', () => {
    const selectOption = jest.fn();
    const component = render(
      <Select
        parentId="someId"
        label="test"
        defaultOption="default value"
        options={[
          { label: 'label 1', value: 'value1' },
          { label: 'label 2', value: 'value2' },
          { label: 'label 3', value: 'value3' }
        ]}
        selectOption={selectOption}
      />
    );

    expect(component.getByTestId('someId-select-label')).toHaveTextContent('test');
  });

  it('should render the default option', () => {
    const selectOption = jest.fn();
    const component = render(
      <Select
        parentId="someId"
        label="test"
        defaultOption="default value"
        options={[
          { label: 'label 1', value: 'value1' },
          { label: 'label 2', value: 'value2' },
          { label: 'label 3', value: 'value3' }
        ]}
        selectOption={selectOption}
      />
    );

    expect(component.getByTestId('someId-select-defaultOption')).toHaveTextContent('default value');
  });

  it('should not render the default option', () => {
    const selectOption = jest.fn();
    const component = render(
      <Select
        parentId="someId"
        label="test"
        options={[
          { label: 'label 1', value: 'value1' },
          { label: 'label 2', value: 'value2' },
          { label: 'label 3', value: 'value3' }
        ]}
        selectOption={selectOption}
      />
    );

    expect(component.queryByTestId('someId-select-defaultOption')).not.toBeInTheDocument();
  });

  it('should select the option', () => {
    const selectOption = jest.fn();
    const component = render(
      <Select
        parentId="someId"
        label="test"
        options={[
          { label: 'label 1', value: 'value1' },
          { label: 'label 2', value: 'value2' },
          { label: 'label 3', value: 'value3' }
        ]}
        selectOption={selectOption}
      />
    );

    fireEvent.change(component.getByTestId('someId-select'), { target: { value: 'value1' } });
    expect(selectOption).toHaveBeenCalledWith('value1');
  });
});
