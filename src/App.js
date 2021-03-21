import './App.css';
import 'antd/dist/antd.css';
import ContractorComponent from "./components/ContractorComponent";
import PartCartComponent from "./components/PartCartComponent";
import { Layout, PageHeader } from 'antd';
const { Footer, Content } = Layout;

const App = () => {
  return (
    // <div className="App">
    //   <div className="contractor-section">
    //       <ContractorComponent />
    //   </div>
    //   <div className="parts-cart-section">
    //       <PartCartComponent />
    //   </div>
    // </div>

    // <div className="App">
    //   <Card hoverable>
    //       <Divider orientation="left">
    //       </Divider>
    //       <Grid label={"Contractor"}>
    //         <ContractorComponent />
    //       </Grid>
    //       <Item label={"Parts"}>
    //         <PartCartComponent />
    //       </Item>
    //   </Card>
    // </div>
  <div className="App">
      
      <Layout>
      <PageHeader
          className="app-page-header"
          title="Parts Management"
        />
        <Layout className="app-page-layout">
          <Content><ContractorComponent /></Content>
          <Content className="app-page-content"><PartCartComponent /></Content>
        </Layout>
        <Footer>By: vivek krishna varma</Footer>
      </Layout>
    </div>
  );
}

export default App;
