import { shallowMount } from '@vue/test-utils';
import Calculator from '@/components/CalculatorWidget.vue';

describe('CalculatorWidget.vue', () => {

  it('adds correctly', async () => {
      global.fetch = jest.fn(() =>
                  Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ result: 3 })
                  })
      );

      const wrapper = shallowMount(Calculator);

      await wrapper.find('button').trigger('click'); // 1
      await wrapper.find('button:nth-child(4)').trigger('click'); // +
      await wrapper.find('button:nth-child(2)').trigger('click'); // 2
      await wrapper.find('button:last-child').trigger('click');

      await wrapper.vm.$nextTick();

      expect(global.fetch).toHaveBeenCalledTimes(1);

      const requestBody = JSON.parse(global.fetch.mock.calls[0][1].body);
      expect(requestBody.number1).toBe(1);
      expect(requestBody.number2).toBe(2);
      expect(requestBody.operation).toBe('ADD');

      global.fetch.mockClear();
      delete global.fetch;
    });

  it('subtracts correctly', async () => {
        global.fetch = jest.fn(() =>
                    Promise.resolve({
                      ok: true,
                      json: () => Promise.resolve({ result: 4 })
                    })
        );

        const wrapper = shallowMount(Calculator);

        await wrapper.find('button:nth-child(9)').trigger('click'); // 7
        await wrapper.find('button:nth-child(8)').trigger('click'); // -
        await wrapper.find('button:nth-child(3)').trigger('click'); // 3
        await wrapper.find('button:last-child').trigger('click');

        await wrapper.vm.$nextTick();

        expect(global.fetch).toHaveBeenCalledTimes(1);

        const requestBody = JSON.parse(global.fetch.mock.calls[0][1].body);
        expect(requestBody.number1).toBe(7);
        expect(requestBody.number2).toBe(3);
        expect(requestBody.operation).toBe('SUB');

        global.fetch.mockClear();
        delete global.fetch;
      });

  it('multiplies correctly', async () => {
          global.fetch = jest.fn(() =>
                      Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({ result: 30 })
                      })
          );

          const wrapper = shallowMount(Calculator);

          await wrapper.find('button:nth-child(6)').trigger('click'); // 5
          await wrapper.find('button:nth-child(12)').trigger('click'); // *
          await wrapper.find('button:nth-child(7)').trigger('click'); // 6
          await wrapper.find('button:last-child').trigger('click');

          await wrapper.vm.$nextTick();

          expect(global.fetch).toHaveBeenCalledTimes(1);

          const requestBody = JSON.parse(global.fetch.mock.calls[0][1].body);
          expect(requestBody.number1).toBe(5);
          expect(requestBody.number2).toBe(6);
          expect(requestBody.operation).toBe('MUL');

          global.fetch.mockClear();
          delete global.fetch;
        });

  it('divides and displays the result correctly', async () => {
            global.fetch = jest.fn(() =>
                        Promise.resolve({
                          ok: true,
                          json: () => Promise.resolve({ result: 0.933333 })
                        })
            );

            const wrapper = shallowMount(Calculator);

            await wrapper.find('button:nth-child(10)').trigger('click'); // 8
            await wrapper.find('button:nth-child(5)').trigger('click'); // 4
            await wrapper.find('button:nth-child(15)').trigger('click'); // /
            await wrapper.find('button:nth-child(11)').trigger('click'); // 9
            await wrapper.find('button:nth-child(13)').trigger('click'); // 0
            await wrapper.find('button:last-child').trigger('click');

            await wrapper.vm.$nextTick();

            expect(global.fetch).toHaveBeenCalledTimes(1);

            const requestBody = JSON.parse(global.fetch.mock.calls[0][1].body);
            expect(requestBody.number1).toBe(84);
            expect(requestBody.number2).toBe(90);
            expect(requestBody.operation).toBe('DIV');

            expect(wrapper.vm.display).toBe('0.933333');

            global.fetch.mockClear();
            delete global.fetch;
          });

  it('handles division by zero error correctly', async () => {
    global.fetch = jest.fn(() =>
                    Promise.resolve({
                      ok: false,
                      status: 400,
                      json: () => Promise.resolve({ error: 'Division by 0' })
                    })
        );

    const wrapper = shallowMount(Calculator);

    await wrapper.find('button').trigger('click'); // 1
    await wrapper.find('button:nth-child(15)').trigger('click'); // /
    await wrapper.find('button:nth-child(13)').trigger('click'); // 0
    await wrapper.find('button:last-child').trigger('click'); // =

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.display).toBe('ERROR: Division by 0!');

    global.fetch.mockClear();
    delete global.fetch;
  });
});