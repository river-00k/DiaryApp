import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
//import { useNavigate} from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
//mport nprogress from 'nprogress';
import Button from './Button';
import RichTextArea from './RichTextArea';
import { useDiary } from '../contexts/DiaryContext';
import { useAuth } from '../contexts/AuthContext';


//const NUMBER_OF_IMAGES = 4;
const IMAGE_CONTAINER_CLASS = 'image-container';

const createEditorStateFromContent = content => {

  let contentState;
  if (typeof content === 'string') {
    contentState = ContentState.createFromText(content);
  } else if (content.blocks) {
    contentState = convertFromRaw(content);
  } else {
    contentState = content;
  }

  return EditorState.createWithContent(contentState);
};

const FormContainer = styled.form`
  .image-preview {
    margin: ${props => props.theme.spacing['6']} 0;
    display: block;
    width: 150px;
    height: 150px;
  }

  .field-group {
    display: block;
    margin: ${props => props.theme.spacing['8']} 0;
  }

  .field-label {
    display: block;
    color: ${props => props.theme.text.muted};
    margin: ${props => props.theme.spacing['3']} 0;
  }

  .title-field {
    appearance: none;
    background: ${(props) => props.theme.contentBg};
    border: 1px solid ${(props) => props.theme.border.default};
    border-radius: 5px;
    color: inherit;
    display: block;
    line-height: inherit;
    width: 100%;
    padding: ${(props) => props.theme.spacing['2']}
      ${(props) => props.theme.spacing['3']};
    
    &.title-invalid {
      border-width: 1px;
      border-color: ${(props) => props.theme.border.danger};
    }

  }

  .title-invalid {
    appearance: none;
    background: ${(props) => props.theme.contentBg};
    border: 1px solid ${(props) => props.theme.border.default};
    border-radius: 5px;
    color: inherit;
    display: block;
    line-height: inherit;
    width: 100%;
    padding: ${(props) => props.theme.spacing['2']}
      ${(props) => props.theme.spacing['3']};
    border-width: 1px;
    border-color: ${(props) => props.theme.border.danger};
  }
    

  .evaluation-list {
    display: flex;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    margin-bottom: 50px;
  }

  img {
    width: 100%;
    height: auto;
  }

  

  .${IMAGE_CONTAINER_CLASS} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: ${props => props.theme.spacing['2']};
    justify-content: center;
  }

  .progress-bar {
    min-height: ${props => props.theme.spacing['2']};
    display: block;
  }

  .image-radio {
    position: relative;

    [type='radio'] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    img {
      display: block;
      width: 100%;
      cursor: pointer;
      box-shadow: ${props => props.theme.boxShadow.default};
      border-radius: 5px;

      &:hover {
        box-shadow: ${props => props.theme.boxShadow.lg};
      }
    }



    &.is-selected {
      img {
        box-shadow: none;
      }

      &::after {
        content: '✓';
        color: white;
        background-color: ${props => props.theme.background.success};
        border-radius: ${props => props.theme.radius.full};
        width: 10px;
        height: 10px;
        padding: ${props => props.theme.spacing['3']};
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        position: absolute;
        top: 10px;
        left: 10px;
      }
    }
  }
`;

const Error = styled.span`
  margin: ${props => props.theme.spacing['2']};
  color: ${props => props.theme.text.danger};
`;

const ProductSchema = Yup.object().shape({
  title: Yup.string().required('* required'),
  description: Yup.mixed().test('is-empty', '* required', value =>
    value.getCurrentContent().hasText()
  ),
});

// const ImageRadioInputs = props => {
//   const { name, urls, value, onChange, onBlur, setFieldValue } = props;

//   useEffect(() => {
//     if (value.length || !urls.length) return;
//     setFieldValue(name, urls[0]);
//   }, [name, setFieldValue, urls, value.length]);

//   return urls.map((url, i) => {
//     const key = `${url}${i}`;
//     const checked = url === value;
//     return (
//       <div key={key} className={`image-radio${checked ? ' is-selected' : ''}`}>
//         <label htmlFor={key}>
//           <input
//             id={key}
//             type="radio"
//             name={name}
//             value={url}
//             checked={url === value}
//             onChange={onChange}
//             onBlur={onBlur}
//           />
//           <img src={url} alt="" />
//         </label>
//       </div>
//     );
//   });
// };

const FocusOnError = props => {
  const { isValid, isSubmitting, errors, fieldElements } = props;
  useEffect(() => {
    if (!isSubmitting || isValid) return;

    const firstErrorKey = Object.keys(errors)[0];
    const el = fieldElements[firstErrorKey];
    if (!el) return;
    el.focus();
  }, [errors, fieldElements, isSubmitting, isValid]);

  return null;
};

// pass in id
const Form = (props) => {
  const {product} = props
  const { addProduct, editProduct } = useDiary();
  const auth = useAuth()
  const user_id = auth?.user.id
  //const navigate = useNavigate();
  // const [imageOptions, setImageOptions] = useState(null);
  //const [isFetching, setIsFetching] = useState(false); //画像の読み込み関連
  //const [fetchingErrorMessage, setFetchingErrorMessage] = useState(null);
  const fieldElements = { title: useRef(), description: useRef(), evaluation: useRef() };
  const setFieldEl = name => el => {
    fieldElements[name] = el;
  };

  const initialImageUrl = product && product.image_url ? product.image_url : null;

  //nprogress.configure({ parent: `.progress-bar` });

  // useEffect(() => {
  //   //画像関連
  //   if (imageOptions) return;
  //   setIsFetching(true);
  //   nprogress.start();
  //   const numberOfImages = initialImageUrl ? NUMBER_OF_IMAGES - 1 : NUMBER_OF_IMAGES;
  //   const fetchImagePromise = Array(numberOfImages)
  //     .fill()
  //     .map((_, index) =>
  //       fetch(`https://source.unsplash.com/collection/345710/150x150?sig=${index}`)
  //     );

  //   Promise.all(fetchImagePromise)
  //     .then(imageRes => {
  //       const fetchedUrls = imageRes.map(res => res.url);
  //       const allUrls = initialImageUrl ? [initialImageUrl, ...fetchedUrls] : fetchedUrls;
  //       nprogress.done();
  //       setImageOptions(allUrls);
  //       setIsFetching(false);
  //     })
  //     .catch(() => {
  //       console.log(
  //         '🧹 Swipping image fetching error under the rug. In production use error tracking system.'
  //       );
  //       nprogress.done();
  //       setIsFetching(false);
  //       setFetchingErrorMessage('Unable to retrieve images. Please refresh the page.');
  //     });
  // }, [imageOptions, initialImageUrl]);

  return (
    <>
      <Formik
        initialValues={{
          id: product ? product.id : -1,
          date: product ? product.date : new Date(),
          title: product ? product.title : '',
          description: product
            ? createEditorStateFromContent(JSON.parse(product.description))
            : EditorState.createEmpty(),
          image_url: initialImageUrl || '',
          evaluation: product ? product.evaluation: 5
        }}
        validationSchema={ProductSchema}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          // if (isFetching) {
          //   setSubmitting(false);
          //   return;
          // }


          console.log(values)
          const { id, date, title, description, image_url, evaluation } = values;
          
          //DBに格納するためにdescriptionデータを整理
          let dbDescription = description.getCurrentContent()
          dbDescription = convertToRaw(dbDescription)
          dbDescription = JSON.stringify(dbDescription)
          
          const allValues = { id, date, user_id, title, description: dbDescription, image_url, evaluation};
    
          console.log(allValues)

          if (product) {
            editProduct(allValues);
          } else {
            addProduct(allValues);
          }

          //navigate("/mypage/diary/home");
        }}
      >
        {props => {
          const {
            values: { title, description, image_url, evaluation },
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched,
            dirty,
            isSubmitting,
            isValid,
          } = props;

          const titleInvalid = errors.title && touched.title;
          const descriptionInvalid = errors.description && touched.description;
          
          //表示部分
          
          return (

            <FormContainer onSubmit={handleSubmit}>
              <FocusOnError
                isValid={isValid}
                isSubmitting={isSubmitting}
                errors={errors}
                fieldElements={fieldElements}
              />
              <label htmlFor="title" className="field-group">
                <span className="field-label">
                  Title{titleInvalid ? <Error>{errors.title}</Error> : null}
                </span>
                <input
                  ref={setFieldEl('title')}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={title}
                  name="title"
                  className={titleInvalid ? 'title-invalid' : 'title-field'}
                />
              </label>

              <label htmlFor="description" className="field-group">
                <span className="field-label">
                  Description{descriptionInvalid ? <Error>{errors.description}</Error> : null}
                </span>
                <RichTextArea
                  name="description"
                  value={description}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  charsLimit={500}
                  setFieldEl={setFieldEl}
                  isInvalid={descriptionInvalid}
                />
              </label>
              <label htmlFor='evaluation' className="field-group">
                <span className='field-label'>
                  Evaluation
                </span>
                <div className='evaluation-list'>
                  <input id="excelent" type="radio" name="evaluation" value="5" checked={evaluation === 5} onChange={()=> setFieldValue("evaluation", 5)}/>
                  <label htmlFor="excelent">
                    <img src="/img/excelent.png"/>
                  </label>
                  <input id="good" type="radio" name="evaluation" value="4" checked={evaluation === 4} onChange={()=> setFieldValue("evaluation", 4)}/>
                  <label htmlFor="good">
                    <img src="/img/good.png"/>
                  </label>
                  <input id="fine" type="radio" name="evaluation" value="3" checked={evaluation === 3} onChange={()=> setFieldValue("evaluation", 3)}/>
                  <label htmlFor="fine">
                    <img src="/img/fine.png"/>
                  </label>
                  <input id="bad" type="radio" name="evaluation" value="2" checked={evaluation === 2} onChange={()=> setFieldValue("evaluation", 2)}/>
                  <label htmlFor="bad">
                    <img src="/img/bad.png"/>
                  </label>
                  <input id="terrible" type="radio" name="evaluation" value="1" checked={evaluation === 1} onChange={()=> setFieldValue("evaluation", 1)}/>
                  <label htmlFor="terrible">
                    <img src="/img/terrible.png"/>
                  </label>
                  
                </div>
              </label>
              {/* <div className="field-group">
                <span className="field-label">Image</span>
                <span className="progress-bar" />
                {fetchingErrorMessage && <Error>{fetchingErrorMessage}</Error>}
                <div className={IMAGE_CONTAINER_CLASS}>
                  {imageOptions && (
                    <ImageRadioInputs
                      name="image_url"
                      value={image_url}
                      urls={imageOptions}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </div>
              </div> */}
              
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </FormContainer>
            
            
          );
        }}
      </Formik>
    </>
  );
};

export default Form;