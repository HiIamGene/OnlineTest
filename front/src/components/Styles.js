import { Layout } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

export const Container = styled.div`
  width: "100%";
  margin: '0px auto';
`

export const ContentContainer = styled(Content)`
  padding: 20px;
  height: 100vh;
`

export const HeadlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const BoxContainer = styled.div`
  padding: 10px;
  background-color: '#ffffff';
`

export const BoxEditWrapper = styled.div`
  float: right;
`

export const BoxWrapper = styled.div`
  padding: 5px;
`

export const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
`