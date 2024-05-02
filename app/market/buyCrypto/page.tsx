"use client";
import { Button, Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

export default function BuyCrypto() {
  const rate = [
    {
      name: "btc",
      rate: 57000,
    },
    {
      name: "usd",
      rate: 36,
    },
    {
      name: "eth",
      rate: 2900,
    },
  ];
  const currencySpend = [
    {
      label: "USD",
      value: "USD",
    },
    {
      label: "BTC",
      value: "BTC",
    },
    {
      label: "ETH",
      value: "ETH",
    },
  ];
  const currencyReceive = [
    {
      label: "USD",
      value: "USD",
    },
    {
      label: "BTC",
      value: "BTC",
    },
    {
      label: "ETH",
      value: "ETH",
    },
  ];
  const [selected, setSelected] = useState<string | number>("buy");
  const [selectedSpend, setSelectedSpend] = useState<string>(
    currencySpend[0].value
  );
  const [selectedReceive, setSelectedReceive] = useState<string>(
    currencyReceive[1].value
  );
  const [spendVal, setSpendVal] = useState<number>(0);
  const [receiveVal, setReceiveVal] = useState<number>(0);

  const convert = (symbol: string, amount: number) => {
    const price: number = rate.find((e) => e.name === symbol.toLowerCase())
      ?.rate as number;
    let receive: number = 0;
    if (selected === "buy") {
      receive = amount / price;
      setReceiveVal(receive);
    } else {
      receive = amount * price;
      setReceiveVal(receive);
    }
  };
  const changeSpendVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSpendVal(Number(value));
    if (spendVal && selectedReceive) {
      if (selected === "buy") {
        convert(selectedReceive, spendVal);
      } else {
        convert(selectedSpend, spendVal);
      }
    }
  };

  const changeSelectSpend = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedSpend(value);
  };
  const changeSelectReceive = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedReceive(value);
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-2 m-2 h-[100dvh] ">
        <div className="">item1</div>
        <div className="">
          <h1 className="text-center text-2xl ">convert cypto</h1>
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="buy" title="Buy">
              <div className="flex flex-col gap-4">
                <Card className="p-1">
                  <CardBody className="bg-white ">
                    <Input
                      variant="bordered"
                      type="number"
                      label="spend"
                      value={spendVal.toString()}
                      onChange={changeSpendVal}
                      endContent={
                        <div className="flex items-center">
                          <label className="sr-only" htmlFor="currency">
                            Currency
                          </label>
                          <select
                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                            id="currency"
                            name="currency"
                            value={selectedSpend}
                            onChange={changeSelectSpend}
                          >
                            {selected === "buy"
                              ? currencySpend
                                  .filter((cur) => cur.value === "USD")
                                  .map((cur) => (
                                    <option key={cur.value} value={cur.value}>
                                      {cur.label}
                                    </option>
                                  ))
                              : currencySpend.map((cur) => (
                                  <option key={cur.value} value={cur.value}>
                                    {cur.label}
                                  </option>
                                ))}
                          </select>
                        </div>
                      }
                    />
                    <br />
                    <Input
                      variant="bordered"
                      type="number"
                      label="receive"
                      value={receiveVal.toString()}
                      endContent={
                        <div className="flex items-center">
                          <label className="sr-only" htmlFor="currency">
                            Currency
                          </label>
                          <select
                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                            id="currency"
                            name="currency"
                            value={selectedReceive}
                            onChange={changeSelectReceive}
                          >
                            {currencyReceive.map((cur) => (
                              <option key={cur.value} value={cur.value}>
                                {cur.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      }
                    />
                  </CardBody>
                </Card>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Login/Sign Up
                  </Button>
                </div>
              </div>
            </Tab>
            <Tab key="sell" title="Sell">
              <div className="flex flex-col gap-4">
                <Card className="p-1">
                  <CardBody className="bg-white ">
                    <Input
                      variant="bordered"
                      type="number"
                      label="spend"
                      value={spendVal.toString()}
                      onChange={changeSpendVal}
                      endContent={
                        <div className="flex items-center">
                          <label className="sr-only" htmlFor="currency">
                            Currency
                          </label>
                          <select
                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                            id="currency"
                            name="currency"
                            value={selectedSpend}
                            onChange={changeSelectSpend}
                          >
                            {currencySpend
                              .filter((item) => item.value != "USD")
                              .map((cur) => (
                                <option key={cur.value} value={cur.value}>
                                  {cur.label}
                                </option>
                              ))}
                          </select>
                        </div>
                      }
                    />
                    <br />
                    <Input
                      variant="bordered"
                      type="number"
                      label="receive"
                      value={receiveVal.toString()}
                      endContent={
                        <div className="flex items-center">
                          <label className="sr-only" htmlFor="currency">
                            Currency
                          </label>
                          <select
                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                            id="currency"
                            name="currency"
                            value={selectedReceive}
                            onChange={changeSelectReceive}
                          >
                            {currencyReceive
                              .filter((item) => item.value === "USD")
                              .map((cur) => (
                                <option key={cur.value} value={cur.value}>
                                  {cur.label}
                                </option>
                              ))}
                          </select>
                        </div>
                      }
                    />
                  </CardBody>
                </Card>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Login/Sign Up
                  </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
