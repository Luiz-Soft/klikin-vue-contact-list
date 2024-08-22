import { shallowMount } from '@vue/test-utils';
import Contact from '@/components/Contact.vue';

describe('Contact.vue', () => {
  let wrapper;

  const contact = {
    firstname: 'John',
    lastname: 'Doe',
    phoneNumber: ['123-456-7890'],
    email: ['john.doe@example.com'],
  };

  beforeEach(() => {
    wrapper = shallowMount(Contact, {
      propsData: { contact },
      mocks: {
        $t: (msg) => msg, // Mock the $t function for i18n
      },
      stubs: ['v-form'], // Stub the v-form component
    });

    // Mock the $refs.form.validate method
    wrapper.vm.$refs.form = {
      validate: jest.fn().mockReturnValue(true),
    };
  });

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.custom-title').text()).toBe('DOE, John');
  });

  it('toggles edit mode', async () => {
    expect(wrapper.vm.isEditing).toBe(false);
    await wrapper.vm.toggleEdit();
    expect(wrapper.vm.isEditing).toBe(true);
  });

  it('emits update-contact event when save is clicked', async () => {
    wrapper.setData({ isEditing: true });
    await wrapper.vm.saveContact();
    expect(wrapper.vm.isEditing).toBe(false);
    expect(wrapper.emitted()['update-contact']).toBeTruthy();
  });

  it('emits delete-contact event when delete is clicked', () => {
    wrapper.vm.deleteContact();
    expect(wrapper.emitted()['delete-contact']).toBeTruthy();
  });
});
